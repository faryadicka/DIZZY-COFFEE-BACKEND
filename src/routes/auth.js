const Router = require("express").Router()
const { registerUserControl, loginUserControl } = require("../controllers/auth")

Router
  .post("/register", registerUserControl)
  .post("/login", loginUserControl)

module.exports = Router