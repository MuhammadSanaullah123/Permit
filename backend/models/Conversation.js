const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    /*   receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    }, */
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    messages: [
      {
        sender: {
          type: String,
        },
        message: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = Conversation = mongoose.model(
  "conversation",
  ConversationSchema
);
