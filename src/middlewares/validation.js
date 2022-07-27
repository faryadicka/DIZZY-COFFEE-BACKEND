const { getEmailUser } = require("../models/auth");
const { onFailed } = require("../helpers/response");
const validate = {};

validate.InsertProduct = (req, res, next) => {
  const { body } = req;
  const bodyKeysAvailable = [
    "name",
    "price",
    "image",
    "description",
    "start",
    "end",
    "updated",
    "categoryId",
    "deliveryMethodsId",
    "sizeId",
    "deliveryInfo",
  ];
  const bodyKeysFind = Object.keys(body);
  const bodyKeysFilter =
    bodyKeysAvailable.filter((item) => !bodyKeysFind.includes(item)).length == 0
      ? true
      : false;
  if (!bodyKeysFilter) return onFailed(res, 400, "Input body invalid!");
  next();
};

validate.checkDuplicate = (req, res, next) => {
  const { email } = req.body;
  getEmailUser(email)
    .then((res) => {
      if (res.rowCount !== 0) {
        return onFailed(res, 409, "email is already use");
      }
      next();
    })
    .catch(() => {
      onFailed(res, 409, "email is already use");
    });
};

validate.registerInput = (req, res, next) => {
  // cek apakah Undifined body sesuai dengan yang diinginkan
  const { email, password } = req.body;
  let emailFormat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  if (!email) {
    return onFailed(res, 400, "Email cannot be empty!");
  }
  for (const key in req.body) {
    if (key === "email") {
      if (!req.body[key].match(emailFormat)) {
        return onFailed(res, 400, "Please insert a valid email!");
      }
    }
  }

  if (!password) {
    return onFailed(res, 400, "Password cannot be empty!");
  }

  next();
};
validate.loginInput = (req, res, next) => {
  // cek apakah Undifined body sesuai dengan yang diinginkan
  const { email, password } = req.body;
  let emailFormat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  if (!email) {
    return onFailed(res, 400, "Email cannot be empty!");
  }

  for (const key in req.body) {
    if (key === "email") {
      if (!req.body[key].match(emailFormat)) {
        return onFailed(res, 400, "Please insert a valid email!");
      }
    }
  }
  if (!password) {
    return onFailed(res, 400, "Password cannot be empty!");
  }

  next();
};
module.exports = validate;
