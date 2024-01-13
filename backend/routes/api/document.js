const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const path = require("path");
const Multer = require("multer");
const Document = require("../../models/Document");
const User = require("../../models/User");
const { ReadableStreamBuffer } = require("stream-buffers");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const WebSocket = require("ws");
const { Server } = require("socket.io");
const http = require("http");
const { app } = require("../../server");
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.SENDGRID_API,
    },
  })
);
const multer = Multer({
  storage: Multer.memoryStorage(),
});
const cloudStorage = new Storage({
  keyFilename: path.join(
    __dirname,
    "../../intricate-muse-386213-b741d7f5defb.json"
  ),
  projectId: process.env.PROJECT_ID,
});
const bucketName = "permit_bucket";
const bucket = cloudStorage.bucket(bucketName);

// @route   POST api/document
// @desc    Create a document
// @access  Private
let progress;
router.post(
  "/",
  auth,

  multer.single("file"),
  async (req, res) => {
    try {
      const { name, address, contractor, type, valuation } = req.body;
      const match = await Document.findOne({
        documentName: req.file.originalname,
      });
      if (match) {
        return res.status(404).json({ msg: "Document Name must be unique" });
      }
      // Multer middleware has processed the file upload
      if (!req.file) {
        res.status(400).send("No file uploaded.");
        return;
      }

      const blob = bucket.file(req.file.originalname);

      const blobStream = blob.createWriteStream({
        resumable: true,
      });

      const fileSize = req.file.size; // Total size of the file
      let uploadedBytes = 0;

      const fileBufferStream = new ReadableStreamBuffer();
      fileBufferStream.put(req.file.buffer);
      fileBufferStream.stop();

      fileBufferStream.on("data", (chunk) => {
        uploadedBytes += chunk.length;
        progress = ((uploadedBytes / fileSize) * 100).toFixed(2);
        console.log(`Progress: ${progress}%`);
      });
      fileBufferStream
        .pipe(blobStream)
        .on("error", (error) => {
          res.status(500).json({
            message: "Error during file uploaddd!",
            error: error.message,
          });
        })
        .on("finish", async () => {
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          );
          const signedUrl = await blob.getSignedUrl({
            action: "read",
            expires: new Date("2200-01-01T00:00:00Z"),
          });

          const document = new Document({
            user: req.user.id,
            projectName: name,
            address,
            contractor,
            permitType: type,
            valuation,
            fileSize: req.file.size,
            documentName: req.file.originalname,
            url: signedUrl[0],
          });
          const newDocument = await document.save();

          res.status(200).json(newDocument);
        });

      /*      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage.");
      });

      blobStream.on("finish", async () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        const signedUrl = await blob.getSignedUrl({
          action: "read",
          expires: new Date("2200-01-01T00:00:00Z"),
        });

        const document = new Document({
          user: req.user.id,
          projectName: name,
          address,
          contractor,
          permitType: type,
          valuation,
          fileSize: req.file.size,
          documentName: req.file.originalname,
          url: signedUrl[0],
        });
        const newDocument = await document.save();

        res.status(200).json(newDocument);
      }); */
      // Write the file buffer to the Google Cloud Storage blob
      /*  blobStream.end(req.file.buffer); */
      /*   fileBufferStream.end(req.file.buffer); */
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/progress", (req, res) => {
  res.json({ progress });
});

// @route   GET api/document/me
// @desc    Get all document of current user
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const document = await Document.find({
      user: req.user.id,
    });

    if (document.length === 0) {
      return res.status(404).json({ msg: "Documents not found" });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/document
// @desc    Get document by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id });

    if (!document) {
      return res.status(404).json({ msg: "Document not found" });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/document
// @desc    Get all documents of all users
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const document = await Document.find();

    if (document.length === 0) {
      return res.status(404).json({ msg: "Documents not found" });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/document/:id
// @desc    Delete document by id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id });

    if (!document) {
      return res.status(404).json({ msg: "Document not found" });
    }
    const fileName = document.documentName;
    await bucket.file(fileName).delete();
    await document.deleteOne();

    res.status(200).json({ msg: "Document deleted" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Document not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PATCH api/document/:id
// @desc    Change status of document by id
// @access  Private
router.patch("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const document = await Document.findById(req.params.id);
    const user = await User.findById({ _id: document.user });
    if (!document) {
      return res.status(404).json({ msg: "Document not found" });
    }

    document.status = status;

    await document.save();

    const mail = await transporter.sendMail({
      to: `${user.email}`,
      from: process.env.ADMIN_MAIL, // sender address
      subject: `Document Status Update!`,
      html: `<div><h3>Dear ${user.name},</h3>
      <p>
      Your project "${document.projectName}" with the document "${document.documentName}" has been ${status}!
      </p>

      <p>
    Regards,
    Team Permit
      </p>
      </div>`,
    });
    console.log("mail");
    console.log(mail);
    res.json(document);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Invoice not found" });
    }
    res.status(500).send("Server Error");
  }
});
module.exports = router;
