const Router = require("express").Router()
const {
  insertPromoControl,
  getAllPromosControl,
  searchPromoByNameControl,
  updatePromoControl,
  deletePromoControl
} = require("../controllers/promos")

Router
  .post("/insert", insertPromoControl)
  .get("/all", getAllPromosControl)
  .get("/search", searchPromoByNameControl)
  .patch("/update/:id", updatePromoControl)
  .delete("/delete/:id", deletePromoControl)

module.exports = Router