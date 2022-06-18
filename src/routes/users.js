const Router = require("express").Router()
const {
  getAllUsersControl,
  getDetailUserControl,
  updateUserControl
} = require("../controllers/users")
const { verifyToken } = require("../middlewares/auth")
const { imageUpload } = require("../middlewares/multer")

Router
  .get("/", getAllUsersControl)
  .get("/profile", verifyToken, getDetailUserControl)
  .patch("/profile", verifyToken, imageUpload("image"), updateUserControl)

module.exports = Router