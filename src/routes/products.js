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
const {roleAdmin} = require("../middlewares/authRole")
const {imageUpload} = require("../middlewares/multer")


const {
  InsertProduct
} = require("../middlewares/validation")
Router
  .get("/", getProductsControl)
  .get("/favorite", getFavoriteProductControl)
  .get("/detailproduct/:id", getProductDetailControl)
  .post("/", verifyToken, roleAdmin, imageUpload, InsertProduct, insertProductControl)
  .patch("/:id", verifyToken, roleAdmin, imageUpload, updateProductControl)
  .delete("/:id", verifyToken, roleAdmin, deleteProductControl)


module.exports = Router