const Router = require("express").Router();
const {
  getAllUsersControl,
  getDetailUserControl,
  updateUserControl,
  resetPasswordController,
  updatePasswordControl,
} = require("../controllers/users");
const { verifyToken } = require("../middlewares/auth");
const { imageUpload } = require("../middlewares/multer");

Router.get("/", getAllUsersControl)
  .get("/profile", verifyToken, getDetailUserControl)
  .patch("/profile", verifyToken, imageUpload("image"), updateUserControl)
  .patch("/reset-password", resetPasswordController)
  .patch("/password", verifyToken, updatePasswordControl);

module.exports = Router;
