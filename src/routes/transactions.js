const Router = require("express").Router()
const {
  insertTransactionControl,
  getAllTransactionControl,
  // updateTransactionControl,
  softDeleteTransactionControl,
  deleteTransactionControl,
  getTransactionDetailControl
} = require("../controllers/transaction")

// const { roleAdmin } = require("../middlewares/authRole")
const { verifyToken } = require("../middlewares/auth")

Router
  .post("/", verifyToken, insertTransactionControl)
  .get("/", verifyToken, getAllTransactionControl)
  .get("/:id", getTransactionDetailControl)
  .patch("/:id", verifyToken, softDeleteTransactionControl)
  .delete("/:id", verifyToken, deleteTransactionControl)

module.exports = Router