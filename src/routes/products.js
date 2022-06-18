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
const { roleAdmin } = require("../middlewares/authRole")
const { imageUpload } = require("../middlewares/multer")


// const {
//   InsertProduct
// } = require("../middlewares/validation")
Router
  .get("/", getProductsControl)
  .get("/favorite", getFavoriteProductControl)
  .get("/detail/:id", getProductDetailControl)
  .post("/", verifyToken, roleAdmin, imageUpload("image"), insertProductControl)
  .patch("/:id", verifyToken, roleAdmin, imageUpload("image"), updateProductControl)
  .delete("/:id", verifyToken, roleAdmin, deleteProductControl)


module.exports = Router