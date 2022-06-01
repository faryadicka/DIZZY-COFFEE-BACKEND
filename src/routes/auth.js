const Router = require("express").Router()
const { registerUserControl, loginUserControl } = require("../controllers/auth")
const { checkDuplicate } = require("../middlewares/validation")
const { validateCreateUsers, validateLogin } = require("../middlewares/validationAuth")

Router
  .post("/register", checkDuplicate, validateCreateUsers, registerUserControl)
  .post("/login", validateLogin, loginUserControl)

module.exports = Router