const { getEmailUser } = require("../models/auth")
const {
  onFailed
} = require("../helpers/response")
const validate = {}

validate.InsertProduct = (req, res, next) => {
  const {
    body
  } = req
  const bodyKeysAvailable = ["name", "price", "image", "description", "start", "end", "updated", "categoryId", "deliveryMethodsId", "sizeId", "deliveryInfo"]
  const bodyKeysFind = Object.keys(body)
  const bodyKeysFilter = bodyKeysAvailable.filter((item) => !bodyKeysFind.includes(item)).length == 0 ? true : false
  if (!bodyKeysFilter) return onFailed(res, 400, "Input body invalid!")
  next()
}

validate.checkDuplicate = (req, res, next) => {
  const { email } = req.body
  getEmailUser(email).then((res) => {
    if (res.rowCount !== 0) {
      return onFailed(res, 409, "email is already use")
    }
    next()
  })
    .catch(() => {
      onFailed(res, 409, "email is already use");
    });
}


module.exports = validate