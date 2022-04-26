const Router = require("express").Router()
const productsRouter = require("./products")
const usersRouter = require("./users")
const promosRouter = require("./promos")
const transactionRoute = require("./transactions")
const historyRoute = require("./history")


Router
  .use("/products", productsRouter)
  .use("/users", usersRouter)
  .use("/promos", promosRouter)
  .use("/transactions", transactionRoute)
  .use("/history", historyRoute)


module.exports = Router