const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    projectName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contractor: {
      type: String,
      required: true,
    },
    permitType: {
      type: String,
      required: true,
    },
    valuation: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    documentName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Document = mongoose.model("document", DocumentSchema);
