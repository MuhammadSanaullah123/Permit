const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { validationResult } = require("express-validator");

const Invoice = require("../../models/Invoice");

// @route   POST api/Invoice/:id
// @desc    Create a invoice
// @access  Private

router.post("/:id", auth, async (req, res) => {
  try {
    const { user, useremail, documentName, amount, address, date } = req.body;

    const invoice = new Invoice({
      user,
      documentId: req.params.id,
      useremail,
      documentName,
      amount,
      address,
      issueDate: date,
    });
    const newInvoice = await invoice.save();

    res.status(200).json(newInvoice);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/invoice/:id
// @desc    Get invoice of current document
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ documentId: req.params.id });
    res.status(200).json(invoice);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/invoice
// @desc    Get all invoice of current user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const invoice = await Invoice.find({
      user: req.user.id,
    });
    console.log(invoice);
    if (!invoice) {
      return res.status(404).json({ msg: "Invoices not found" });
    }

    res.status(200).json(invoice);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   UPDATE api/invoice/:id
// @desc    Update the invoice
// @access  Private
router.patch("/:id", auth, async (req, res) => {
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
});

module.exports = router;
