const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationid: {
      type: String,
      required: true,
    },
    sender: {
      type: Object,
      email: String,
      userid: String,
      required: true,
    },

    receiver: {
      type: Object,
      email: String,
      userid: String,
    },

    message: {
      type: {
        type: String,
        enum: ["text", "image", "video", "audio"],
        default: "text",
      },
      text: String,
      uri: String,
    },
  },
  { timestamps: true }
);

const Messages = mongoose.model("messages", messageSchema);

module.exports = Messages;
