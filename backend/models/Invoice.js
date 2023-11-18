const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    useremail: {
      type: String,
      required: true,
    },
    documentName: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    issueDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Unpaid",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Invoice = mongoose.model("invoice", InvoiceSchema);
