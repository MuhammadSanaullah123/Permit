const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const path = require("path");
const Multer = require("multer");
const Permit = require("../../models/Permit");
const Document = require("../../models/Document");

const User = require("../../models/User");
const { ReadableStreamBuffer } = require("stream-buffers");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

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
      const { name, address, contractor, type, valuation, ID } = req.body;
      console.log("ID");
      console.log(ID);

      const match = await Permit.findOne({
        documentName: req.file.originalname,
      });
      const permit_match = await Document.findOne({
        documentName: req.file.originalname,
      });
      if (match || permit_match) {
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
          const document = await Document.findOne({ _id: ID });
          const user = await User.findOne({ _id: document.user });
          const permit = new Permit({
            user: req.user.id,
            documentId: ID,
            projectName: name,
            address,
            contractor,
            permitType: type,
            valuation,
            fileSize: req.file.size,
            documentName: req.file.originalname,
            url: signedUrl[0],
          });
          const newPermit = await permit.save();

          const user_mail = await transporter.sendMail({
            to: `${user.email}`,
            from: `${process.env.ADMIN_MAIL}`, // sender address
            subject: `Permit Status!`,
            html: `<div><h3>Dear ${user.name},</h3>
            <p>
            The permit of project "${document.projectName}" with the document "${document.documentName}" has been uploaded and is available on the website!
            </p>
      
            <p>
          Regards,
          Team Permit
            </p>
            </div>`,
          });

          res.status(200).json(newPermit);
        });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/progress", (req, res) => {
  res.json({ progress });
});

// @route   GET api/permit
// @desc    Get permit by document id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const permit = await Permit.findOne({ documentId: req.params.id });

    if (!permit) {
      return res.status(404).json({ msg: "Permit not found" });
    }

    res.status(200).json(permit);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
