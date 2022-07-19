const Router = require("express").Router();
const {
  registerUserControl,
  loginAuthControl,
  forgotPassword,
  resetPasswordControl,
} = require("../controllers/auth");
const { checkDuplicate } = require("../middlewares/validation");
const { validateCreateUsers } = require("../middlewares/validationAuth");

Router.post(
  "/register",
  checkDuplicate,
  validateCreateUsers,
  registerUserControl
)
  .post("/login", loginAuthControl)
  .post("/forgot", forgotPassword)
  .patch("/reset-password", resetPasswordControl);

module.exports = Router;
