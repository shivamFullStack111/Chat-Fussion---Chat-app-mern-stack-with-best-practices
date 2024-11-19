const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationid: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },

    receiver: {
      type: String,
    },

    message: {
      type: {
        type: String,
        enum: ["text", "image", "video", "audio"],
        default: "text",
      },
      text: String,
      url: String,
    },
  },
  { timestamps: true }
);

const Messages = mongoose.model("messages", messageSchema);

module.exports = Messages;
