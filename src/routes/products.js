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
  verifyTokenv2
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
  .post("/", verifyTokenv2, roleAdmin, imageUpload("image"), insertProductControl)
  .patch("/:id", verifyTokenv2, roleAdmin, imageUpload("image"), updateProductControl)
  .delete("/:id", verifyTokenv2, roleAdmin, deleteProductControl)


module.exports = Router