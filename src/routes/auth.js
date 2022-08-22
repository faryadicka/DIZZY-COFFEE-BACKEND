const Router = require("express").Router();
const {
  registerUserControl,
  loginAuthControl,
  forgotPassword,
  resetPasswordControl,
  verifyEmailControl,
} = require("../controllers/auth");
const {
  registerInput,
  loginInput,
  forgotInput,
  resetInput,
} = require("../middlewares/validation");

Router.post("/register", registerInput, registerUserControl)
  .post("/login", loginInput, loginAuthControl)
  .post("/forgot", forgotInput, forgotPassword)
  .patch("/reset-password/:otp", resetInput, resetPasswordControl)
  .get("/verify/:email", verifyEmailControl);

module.exports = Router;
