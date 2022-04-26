const {
  insertTransactionControl,
  getAllTransactionControl,
  updateTransactionControl,
  deleteTransactionControl,
  getTransactionDetailControl
} = require("../controllers/transaction")

const Router = require("express").Router()

Router
  .post("/insert", insertTransactionControl)
  .get("/all", getAllTransactionControl)
  .get("/detail/:id", getTransactionDetailControl)
  .patch("/update/:id", updateTransactionControl)
  .delete("/delete/:id", deleteTransactionControl)

module.exports = Router