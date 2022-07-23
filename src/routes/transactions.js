const Router = require("express").Router();
const {
  insertTransactionControl,
  getAllTransactionControl,
  // updateTransactionControl,
  softDeleteTransactionControl,
  deleteTransactionControl,
  getTransactionDetailControl,
} = require("../controllers/transaction");

const { verifyToken } = require("../middlewares/auth");

Router.post("/", verifyToken, insertTransactionControl)
  .get("/", verifyToken, getAllTransactionControl)
  .get("/:id", getTransactionDetailControl)
  .patch("/soft-delete", verifyToken, softDeleteTransactionControl)
  .delete("/:id", verifyToken, deleteTransactionControl);

module.exports = Router;
