const Router = require("express").Router()
const {
  insertPromoControl,
  getPromosControl,
  updatePromoControl,
  deletePromoControl
} = require("../controllers/promos")

Router
  .post("/", insertPromoControl)
  .get("/", getPromosControl)
  .patch("/:id", updatePromoControl)
  .delete("/:id", deletePromoControl)

module.exports = Router