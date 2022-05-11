const Router = require("express").Router()
const productsRouter = require("./products")
const usersRouter = require("./users")
const promosRouter = require("./promos")
const transactionRoute = require("./transactions")
const authRouter = require("../routes/auth")


Router
  .use("/products", productsRouter)
  .use("/users", usersRouter)
  .use("/auth", authRouter)
  .use("/promos", promosRouter)
  .use("/transactions", transactionRoute)


module.exports = Router