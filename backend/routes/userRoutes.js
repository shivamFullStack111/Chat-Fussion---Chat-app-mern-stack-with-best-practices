const {
  register,
  login,
  verifyOtp,
  checkAuthenticated,
  updateUser,
} = require("../controllers/userControllers");
const { isAuthenticate } = require("../middlewares/isAuthenticate");
const Users = require("../schemas/userSchema");
const { upload } = require("../uploadProvider");
const userRouter = require("express").Router();

userRouter.post("/register", register);
userRouter.post("/verify-otp", verifyOtp);
userRouter.get("/check-authentication", isAuthenticate, checkAuthenticated);
userRouter.post("/login", login);
userRouter.post("/update-user", isAuthenticate, updateUser);

userRouter.post(
  "/update-image",
  isAuthenticate,
  upload.single("file"),
  async (req, res) => {
    try {
      const { imageType } = req.body;
      const user = await Users.findOne({ email: req?.user?.email });

      if (!user) return res.send({ success: false, message: "User not found" });
      console.log(req.file);
      if (imageType === "background") {
        user.backgroundImage = req.file.path;
        await user.save();
      }
      if (imageType === "profile") {
        user.profileImage = req.file.path;
        await user.save();
      }

      return res.send({
        success: true,
        message: "Image update successfully",
        user,
      });
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  }
);

module.exports = userRouter;
