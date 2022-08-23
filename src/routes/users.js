const Router = require("express").Router();
const {
  getAllUsersControl,
  getDetailUserControl,
  updateUserControl,
  resetPasswordController,
  updatePasswordControl,
} = require("../controllers/users");
const { verifyTokenv2 } = require("../middlewares/auth");
const { imageUpload } = require("../middlewares/multer");

Router.get("/", getAllUsersControl)
  .get("/profile", verifyTokenv2, getDetailUserControl)
  .patch("/profile", verifyTokenv2, imageUpload("image"), updateUserControl)
  .patch("/reset-password", resetPasswordController)
  .patch("/password", verifyTokenv2, updatePasswordControl);

module.exports = Router;
