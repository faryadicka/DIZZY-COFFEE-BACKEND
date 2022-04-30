const Router = require("express").Router()
const {
  insertUserControl,
  getAllUsersControl,
  getDetailUserControl,
  updateUserControl
} = require("../controllers/users")

const {
  registerUserControl,
  loginUserControl
} = require("../controllers/auth")

const {
  InsertUser
} = require("../middlewares/validation")
Router

Router
  .post("/register", registerUserControl)
  .post("/login", loginUserControl)
  .post("/", InsertUser, insertUserControl)
  .get("/", getAllUsersControl)
  .get("/:id", getDetailUserControl)
  .patch("/:id", updateUserControl)

module.exports = Router