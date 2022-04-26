const Router = require("express").Router()
const {
  insertPromoControl,
  getPromosControl,
  updatePromoControl,
  deletePromoControl
} = require("../controllers/promos")

Router
  .post("/insert", insertPromoControl)
  .get("/search", getPromosControl)
  .patch("/update/:id", updatePromoControl)
  .delete("/delete/:id", deletePromoControl)

module.exports = Router