const {
  insertTransactionControl,
  getAllTransactionControl,
  updateTransactionControl,
  deleteTransactionControl
} = require("../controllers/transaction")

const Router = require("express").Router()

Router
  .post("/insert", insertTransactionControl)
  .get("/all", getAllTransactionControl)
  .patch("/update/:id", updateTransactionControl)
  .delete("/delete/:id", deleteTransactionControl)

module.exports = Router