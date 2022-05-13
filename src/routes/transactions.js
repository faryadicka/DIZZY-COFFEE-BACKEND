const Router = require("express").Router()
const {
  insertTransactionControl,
  getAllTransactionControl,
  updateTransactionControl,
  deleteTransactionControl,
  getTransactionDetailControl
} = require("../controllers/transaction")

const {roleAdmin} = require("../middlewares/authRole")
const {verifyToken} = require("../middlewares/auth")

Router
  .post("/", verifyToken, roleAdmin,insertTransactionControl)
  .get("/", getAllTransactionControl)
  .get("/:id", getTransactionDetailControl)
  .patch("/:id", verifyToken, roleAdmin, updateTransactionControl)
  .delete("/:id", verifyToken, roleAdmin, deleteTransactionControl)

module.exports = Router