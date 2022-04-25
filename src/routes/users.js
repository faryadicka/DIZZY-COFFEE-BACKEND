const Router = require("express").Router()
const {
  insertUserControl,
  getAllUsersControl,
  getUsersByIdControl,
  updateUserControl
} = require("../controllers/users")

Router
  .post("/add", insertUserControl)
  .get("/all", getAllUsersControl)
  .get("/:id", getUsersByIdControl)
  .patch("/update/:id", updateUserControl)

module.exports = Router