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

validate.login = (req, res, next) => {
  const { body } = req
  const bodyKeysActive = ["email", "password"]
  const bodyKeysFind = Object.keys(body)
  const bodyKeysFilter = bodyKeysActive.filter((item) => !bodyKeysFind.includes(item)).length == 0 ? true : false
  console.log(bodyKeysFilter)
  if (!bodyKeysFilter) return onFailed(res, 400, "Input body invalid!")

  next()
}

module.exports = validate