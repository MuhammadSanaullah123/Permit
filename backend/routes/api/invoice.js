const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { Client } = require("square");
const { randomUUID } = require("crypto");
const { check, validationResult } = require("express-validator");
const Invoice = require("../../models/Invoice");
const Document = require("../../models/Document");
const User = require("../../models/User");

const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.SENDGRID_API,
    },
  })
);
BigInt.prototype.toJSON = function () {
  return this.toString();
};
const { paymentsApi } = new Client({
  accessToken: process.env.REACT_APP_SQUARE_TOKEN,
  environment: "production",
});

// @route   POST api/Invoice/:id
// @desc    Create a invoice
// @access  Private

router.post("/:id", auth, async (req, res) => {
  try {
    const { user, useremail, projectName, amount, address, date } = req.body;
    const document = await Document.findById(req.params.id);
    const invoice = new Invoice({
      user,
      documentId: req.params.id,
      useremail,
      documentName: document.documentName,
      projectName,
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
    console.log("INSIDE USER ID INVOICE");

    const invoice = await Invoice.find({
      user: req.user.id,
    });

    if (invoice.length === 0) {
      return res.status(404).json({ msg: "Invoices not found" });
    }

    res.status(200).json(invoice);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/invoice/all/users
// @desc    Get all invoice of all users
// @access  Private
router.get("/all/users", auth, async (req, res) => {
  try {
    console.log("INSIDE ALLLLL");
    const invoice = await Invoice.find();
    console.log(invoice);
    if (invoice.length === 0) {
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

    invoice.status = "Paid";

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

// @route   POST api/invoice/:id
// @desc    Pay invoice
// @access  Private
router.post(
  "/square/pay",
  auth,
  [check("email", "Please enter a valid email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let { sourceId, amount, documentId, email } = req.body;
      const { result } = await paymentsApi.createPayment({
        idempotencyKey: randomUUID(),
        sourceId: sourceId,
        amountMoney: {
          currency: "USD",
          amount: amount,
        },
      });
      console.log(result);
      if (result.payment.status === "COMPLETED") {
        const invoice = await Invoice.findOne({ documentId });
        const document = await Document.findOne({ _id: documentId });

        const user = await User.findById({ _id: req.user.id });
        if (!invoice) {
          return res.status(404).json({ msg: "Invoice not found" });
        }

        invoice.status = "Paid";

        await invoice.save();
        const mail = await transporter.sendMail({
          to: `${email}`,
          from: process.env.ADMIN_MAIL, // sender address
          subject: `Invoice Status!`,
          html: `<div><h3>Dear ${user.name},</h3>
          <p>
          Your invoice of project "${document.projectName}" with the document "${document.documentName}" has been paid successfully!
          </p>
    
          <p>
        Regards,
        Team Permit
          </p>
          </div>`,
        });
        const admin_mail = await transporter.sendMail({
          to: `${process.env.ADMIN_MAIL}`,
          from: `${process.env.ADMIN_MAIL}`, // sender address
          subject: `Invoice Status!`,
          html: `<div><h3>Dear ${user.name},</h3>
          <p>
          The invoice of project "${document.projectName}" with the document "${document.documentName}" has been paid successfully!
          </p>
    
          <p>
        Regards,
        Team Permit
          </p>
          </div>`,
        });
      }

      res.status(200).json(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
