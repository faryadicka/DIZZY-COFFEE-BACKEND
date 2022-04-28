const Router = require("express").Router()

const {
  getProductsControl,
  insertProductControl,
  updateProductControl,
  deleteProductControl,
  getProductDetailControl,
} = require("../controllers/products")

// const {
//   queryFind,
//   valueType
// } = require("../middlewares/validation")

Router
  .get("/search", getProductsControl)
  .get("/detail/:id", getProductDetailControl)
  .post("/insert", insertProductControl)
  .patch("/update/:id", updateProductControl)
  .delete("/delete/:id", deleteProductControl)


module.exports = Router