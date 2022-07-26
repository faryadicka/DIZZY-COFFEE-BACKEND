const Router = require("express").Router();
const { remoteNotificationController } = require("../controllers/notif");

Router.post("/", remoteNotificationController);

module.exports = Router;
