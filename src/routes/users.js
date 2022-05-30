const Router = require("express").Router()
const {
  // insertUserControl,
  getAllUsersControl,
  getDetailUserControl,
  updateUserControl
} = require("../controllers/users")
const { verifyToken } = require("../middlewares/auth")
const { roleAdmin } = require("../middlewares/authRole")
const { imageUpload } = require("../middlewares/multer")

Router
  // .post("/", InsertUser, insertUserControl)
  .get("/", getAllUsersControl)
  .get("/profile", verifyToken, getDetailUserControl)
  .patch("/profile", verifyToken, roleAdmin, imageUpload, updateUserControl)

module.exports = Router