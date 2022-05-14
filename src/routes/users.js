const Router = require("express").Router()
const {
  // insertUserControl,
  getAllUsersControl,
  getDetailUserControl,
  updateUserControl
} = require("../controllers/users")
const { verifyToken } = require("../middlewares/auth")
const { roleAdmin } = require("../middlewares/authRole")
const imageUpload = require("../middlewares/multer")

Router
  // .post("/", InsertUser, insertUserControl)
  .get("/", getAllUsersControl)
  .get("/:id", getDetailUserControl)
  .patch("/:id", verifyToken, roleAdmin, imageUpload.single("image"), updateUserControl)

module.exports = Router