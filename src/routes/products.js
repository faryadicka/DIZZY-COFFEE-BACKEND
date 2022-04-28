const Router = require("express").Router()

const {
  getProductsControl,
  insertProductControl,
  updateProductControl,
  deleteProductControl,
  getProductDetailControl,
  getFavoriteProductControl,
} = require("../controllers/products")


Router
  .get("/", getProductsControl)
  .get("/favorite", getFavoriteProductControl)
  .get("/detailproduct/:id", getProductDetailControl)
  .post("/", insertProductControl)
  .patch("/:id", updateProductControl)
  .delete("/:id", deleteProductControl)


module.exports = Router