const Router = require("express").Router()
const {
  insertPromoControl,
  getPromosControl,
  updatePromoControl,
  deletePromoControl
} = require("../controllers/promos")

const {verifyToken} = require("../middlewares/auth")
const {roleAdmin} = require("../middlewares/authRole")
const {imageUpload} = require("../middlewares/multer")

Router
  .post("/", verifyToken, roleAdmin, imageUpload, insertPromoControl)
  .get("/", getPromosControl)
  .patch("/:id", verifyToken, roleAdmin, imageUpload, updatePromoControl)
  .delete("/:id", verifyToken, roleAdmin, deletePromoControl)

module.exports = Router