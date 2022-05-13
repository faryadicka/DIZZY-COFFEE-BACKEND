const Router = require("express").Router()
const {registerUserControl, loginUserControl} = require("../controllers/auth")
const {
  register, login
} = require("../middlewares/validation")
Router
  .post("/register", register, registerUserControl)
  .post("/login", login, loginUserControl)

module.exports = Router