const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Document = require("../../models/Document");

// @route   POST api/document
// @desc    Create a document
// @access  Private

router.post("/", auth, async (req, res) => {
  try {
    const {
      name,
      address,
      contractor,
      type,
      valuation,
      fileSize,
      documentName,
      url,
    } = req.body;

    const document = new Document({
      user: req.user.id,
      projectName: name,
      address,
      contractor,
      permitType: type,
      valuation,
      fileSize,
      documentName,
      url,
    });
    const newDocument = await document.save();

    res.status(200).json(newDocument);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/document/me
// @desc    Get all document of current user
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const document = await Document.find({
      user: req.user.id,
    });

    if (!document) {
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
  console.log("document");

  try {
    const document = await Document.findOne({ _id: req.params.id });
    console.log(document);
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

    if (!document) {
      return res.status(404).json({ msg: "Documents not found" });
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
router.delete("/:id", auth, async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id });

    if (!document) {
      return res.status(404).json({ msg: "Document not found" });
    }

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

/* router.patch("/:id", auth, async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ documentId: req.params.id });

    if (!invoice) {
      return res.status(404).json({ msg: "Invoice not found" });
    }

    invoice.status = "paid";

    await invoice.save();
    res.json(invoice);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Invoice not found" });
    }
    res.status(500).send("Server Error");
  }
}); */
module.exports = router;
