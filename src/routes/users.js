const Router = require("express").Router()
const {
  insertUserControl,
  getAllUsersControl,
  getUsersByIdControl,
  deleteUserControl,
  updateUserControl
} = require("../controllers/users")

Router
  .post("/add", insertUserControl)
  .get("/all", getAllUsersControl)
  .get("/:id", getUsersByIdControl)
  .patch("/update/:id", updateUserControl)
  .delete("/delete/:id", deleteUserControl)

module.exports = Router