const Router = require("express").Router()
const {
  insertUserControl,
  getAllUsersControl,
  getDetailUserControl,
  updateUserControl
} = require("../controllers/users")

Router
  .post("/add", insertUserControl)
  .get("/all", getAllUsersControl)
  .get("/:id", getDetailUserControl)
  .patch("/update/:id", updateUserControl)

module.exports = Router