const Router = require("express").Router()
const { registerUserControl, loginAuthControl } = require("../controllers/auth")
const { checkDuplicate } = require("../middlewares/validation")
const { validateCreateUsers, validateLogin } = require("../middlewares/validationAuth")

Router
  .post("/register", checkDuplicate, validateCreateUsers, registerUserControl)
  .post("/login", validateLogin, loginAuthControl)

module.exports = Router