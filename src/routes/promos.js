const Router = require("express").Router()
const {
  insertPromoControl,
  getPromosControl,
  updatePromoControl,
  deletePromoControl
} = require("../controllers/promos")

const {verifyToken} = require("../middlewares/auth")
const {roleAdmin} = require("../middlewares/authRole")

Router
  .post("/", verifyToken, roleAdmin, insertPromoControl)
  .get("/", getPromosControl)
  .patch("/:id", verifyToken, roleAdmin, updatePromoControl)
  .delete("/:id", verifyToken, roleAdmin, deletePromoControl)

module.exports = Router