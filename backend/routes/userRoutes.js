const { register, login, verifyOtp } = require("../controllers/userControllers");

const userRouter = require("express").Router();

userRouter.post("/register", register);
userRouter.post("/verify-otp", verifyOtp);

userRouter.post("/login", login);

module.exports = userRouter;
