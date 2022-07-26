const Router = require("express").Router();
const productsRouter = require("./products");
const usersRouter = require("./users");
const promosRouter = require("./promos");
const transactionRoute = require("./transactions");
const authRouter = require("../routes/auth");
const notifRouter = require("../routes/notif");

Router.use("/products", productsRouter)
  .use("/users", usersRouter)
  .use("/auth", authRouter)
  .use("/promos", promosRouter)
  .use("/transactions", transactionRoute)
  .use("/notification", notifRouter);

module.exports = Router;
