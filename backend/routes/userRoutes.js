const {
  register,
  login,
  verifyOtp,
  checkAuthenticated,
} = require("../controllers/userControllers");
const { isAuthenticate } = require("../middlewares/isAuthenticate");

const userRouter = require("express").Router();

userRouter.post("/register", register);
userRouter.post("/verify-otp", verifyOtp);
userRouter.get("/check-authentication", isAuthenticate, checkAuthenticated);
userRouter.post("/login", login);

module.exports = userRouter;
