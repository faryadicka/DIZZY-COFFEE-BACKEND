const Router = require("express").Router();
const {
  insertTransactionControl,
  getAllTransactionControl,
  // updateTransactionControl,
  softDeleteTransactionControl,
  deleteTransactionControl,
  getTransactionDetailControl,
} = require("../controllers/transaction");

const { verifyTokenv2 } = require("../middlewares/auth");

Router.post("/", verifyTokenv2, insertTransactionControl)
  .get("/", verifyTokenv2, getAllTransactionControl)
  .get("/:id", getTransactionDetailControl)
  .patch("/soft-delete", verifyTokenv2, softDeleteTransactionControl)
  .delete("/:id", verifyTokenv2, deleteTransactionControl);

module.exports = Router;
