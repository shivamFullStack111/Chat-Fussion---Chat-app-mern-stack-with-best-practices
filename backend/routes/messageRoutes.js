const { isAuthenticate } = require("../middlewares/isAuthenticate");
const Messages = require("../schemas/messageSchema");
const { upload } = require("../uploadProvider");
const cloudinary = require("cloudinary").v2;

const messageRoute = require("express").Router();

messageRoute.post("/get-all-messages", isAuthenticate, async (req, res) => {
  try {
    const messages = await Messages.find({
      conversationid: req?.body.conversationid,
    });

    return res.send({
      success: true,
      messages: messages,
      message: "all message get",
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

messageRoute.post(
  "/create-message",
  isAuthenticate,
  upload.single("file"),
  async (req, res) => {
    try {
      let newMessage;
      if (req.body.type == "text") {
        newMessage = new Messages({
          message: {
            type: req.body.type,
            text: req.body.text,
          },
          receiver: req.body?.receiver?.email,
          sender: req.user?.email,
          conversationid: req?.body?.conversationid,
        });
      }
      console.log("Uploaded file:", JSON.stringify(req.file, null, 2));
      const result = await cloudinary.uploader.upload(req?.file?.path, {
        resource_type: "video",
      });

      newMessage = new Messages({
        sender: req.user?.email,
        receiver: req.body?.receiver?.email,
        conversationid: req.body?.conversationid,
        message: {
          type: "audio",
          url: result.secure_url,
        },
      });
      await newMessage.save();

      return res.send({
        success: true,
        message: "message saved successfully",
        mssg: newMessage,
      });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  }
);

module.exports = messageRoute;
