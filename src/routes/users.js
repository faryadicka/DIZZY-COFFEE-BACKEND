const Router = require("express").Router()
const {
  insertUserControl,
  getAllUsersControl,
  getDetailUserControl,
  updateUserControl
} = require("../controllers/users")

const {
  InsertUser
} = require("../middlewares/validation")
Router

Router
  .post("/", InsertUser, insertUserControl)
  .get("/", getAllUsersControl)
  .get("/:id", getDetailUserControl)
  .patch("/:id", updateUserControl)

module.exports = Router