const Router = require("express").Router()

const {
  getProductsControl,
  insertProductControl,
  updateProductControl,
  deleteProductControl,
  getProductDetailControl,
  getFavoriteProductControl,
} = require("../controllers/products")

const {
  verifyToken
} = require("../middlewares/auth")
const {
  checkRoleAdmin
} = require("../middlewares/authRole")

const {
  InsertProduct
} = require("../middlewares/validation")
Router
  .get("/", getProductsControl)
  .get("/favorite", getFavoriteProductControl)
  .get("/detailproduct/:id", getProductDetailControl)
  .post("/", checkRoleAdmin, verifyToken, InsertProduct, insertProductControl)
  .patch("/:id", checkRoleAdmin, verifyToken, updateProductControl)
  .delete("/:id", checkRoleAdmin, verifyToken, verifyToken, deleteProductControl)


module.exports = Router