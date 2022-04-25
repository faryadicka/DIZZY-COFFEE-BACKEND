const Router = require("express").Router()

const {
  getProductsControl,
  insertProductControl,
  updateProductControl,
  deleteProductControl,
} = require("../controllers/products")

// const {
//   queryFind
// } = require("../middlewares/validation")

Router
  .get("/all", getProductsControl)
  .post("/insert", insertProductControl)
  .patch("/update/:id", updateProductControl)
  .delete("/delete/:id", deleteProductControl)


module.exports = Router