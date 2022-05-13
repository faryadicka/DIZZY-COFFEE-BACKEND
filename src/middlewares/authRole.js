const {onFailed} = require("../helpers/response")

const roleAdmin = (req, res, next) => {
  const { role } = req.userInfo
  if(parseInt(role) !== 1) return onFailed(res, 409, "You are no an admin!")
  next()
}

module.exports = { roleAdmin }