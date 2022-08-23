const Router = require("express").Router()
const {
  insertPromoControl,
  getPromosControl,
  updatePromoControl,
  deletePromoControl,
  getPromoByIdControl,
} = require("../controllers/promos")

const { verifyTokenv2 } = require("../middlewares/auth")
const { roleAdmin } = require("../middlewares/authRole")
const { imageUpload } = require("../middlewares/multer")

Router
  .post("/", verifyTokenv2, roleAdmin, imageUpload("image"), insertPromoControl)
  .get("/", getPromosControl)
  .get("/:id", verifyTokenv2, getPromoByIdControl)
  .patch("/:id", verifyTokenv2, roleAdmin, imageUpload("image"), updatePromoControl)
  .delete("/:id", verifyTokenv2, roleAdmin, deletePromoControl)

module.exports = Router