const Router = require("express").Router()
const { registerUserControl, loginAuthControl } = require("../controllers/auth")
const { checkDuplicate } = require("../middlewares/validation")
const { validateCreateUsers } = require("../middlewares/validationAuth")

Router
  .post("/register", checkDuplicate, validateCreateUsers, registerUserControl)
  .post("/login", loginAuthControl)

module.exports = Router