const Router = require("express").Router()

const {
  getALLHistoriesControl,
  insertHistoryControl,
  updateHistoryControl,
  deleteHistoryControl
} = require("../controllers/history")


Router
  .get("/search", getALLHistoriesControl)
  .post("/insert", insertHistoryControl)
  .patch("/update/:id", updateHistoryControl)
  .delete("/delete/:id", deleteHistoryControl)


module.exports = Router