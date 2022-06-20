const Router = require("express").Router()
const {
  insertPromoControl,
  getPromosControl,
  updatePromoControl,
  deletePromoControl,
  getPromoByIdControl,
} = require("../controllers/promos")

const { verifyToken } = require("../middlewares/auth")
const { roleAdmin } = require("../middlewares/authRole")
const { imageUpload } = require("../middlewares/multer")

Router
  .post("/", verifyToken, roleAdmin, imageUpload("image"), insertPromoControl)
  .get("/", verifyToken, getPromosControl)
  .get(":id", verifyToken, getPromoByIdControl)
  .patch("/:id", verifyToken, roleAdmin, imageUpload("image"), updatePromoControl)
  .delete("/:id", verifyToken, roleAdmin, deletePromoControl)

module.exports = Router