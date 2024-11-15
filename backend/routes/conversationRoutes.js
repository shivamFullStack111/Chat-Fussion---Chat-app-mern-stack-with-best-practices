const { isAuthenticate } = require("../middlewares/isAuthenticate");
const Conversations = require("../schemas/conversationSchema");

const conversationRoute = require("express").Router();

conversationRoute.post(
  "/create-conversation",
  isAuthenticate,
  async (req, res) => {
    try {
      const { users } = req.body;

      const isExist = await Conversations.findOne({ users: { $all: users } });

      if (isExist)
        return res.send({
          success: true,
          message: "conversation already exists",
          conversation: isExist,
        });
      const newConversation = new Conversations({ users });

      await newConversation.save();

      return res.send({
        success: true,
        message: "conversation created",
        conversation: newConversation,
      });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  }
);

module.exports = conversationRoute;
