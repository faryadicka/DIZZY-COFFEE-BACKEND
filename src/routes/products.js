const Router = require("express").Router()

const {
  getAllProductsControl,
  searchProductByNameControl,
  insertProductControl,
  updateProductControl,
  deleteProductControl,
  sortProductTimeControl,
  sortProductPriceControl,
  sortProductTransactionContol
} = require("../controllers/products")

const {
  queryFindPrice,
  queryFindName,
  queryFindTime,
  queryFindTransaction
} = require("../middlewares/validation")

Router
  .get("/all", getAllProductsControl)
  .get("/search", queryFindName, searchProductByNameControl)
  .get("/time", queryFindTime, sortProductTimeControl)
  .get("/price", queryFindPrice, sortProductPriceControl)
  .get("/popular", queryFindTransaction, sortProductTransactionContol)
  .post("/insert", insertProductControl)
  .patch("/update/:id", updateProductControl)
  .delete("/delete/:id", deleteProductControl)

module.exports = Router