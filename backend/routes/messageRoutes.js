const { isAuthenticate } = require("../middlewares/isAuthenticate");
const Messages = require("../schemas/messageSchema");

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

module.exports = messageRoute;
