const {
  insertTransactionControl,
  getAllTransactionControl,
  updateTransactionControl,
  deleteTransactionControl,
  getTransactionDetailControl
} = require("../controllers/transaction")

const Router = require("express").Router()

Router
  .post("/", insertTransactionControl)
  .get("/", getAllTransactionControl)
  .get("/detailtransaction/:id", getTransactionDetailControl)
  .patch("/:id", updateTransactionControl)
  .delete("/:id", deleteTransactionControl)

module.exports = Router