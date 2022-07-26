const { messaging } = require("../config/firebase");
const { onSuccess, onFailed } = require("../helpers/response");
const notif = messaging();

const remoteNotificationController = async (req, res) => {
  try {
    const { body } = req;
    const message = {
      token: body.receiver,
      notification: {
        body: body.message,
        title: body.title,
      },
    };
    await notif.send(message);
    return onSuccess(res, 200, "Notification sent!");
  } catch (err) {
    return onFailed(res, 500, err.message, err);
  }
};

module.exports = { remoteNotificationController };
