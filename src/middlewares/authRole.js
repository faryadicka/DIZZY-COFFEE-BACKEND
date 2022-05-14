const {onFailed} = require("../helpers/response")

const roleAdmin = (req, res, next) => {
  const { role } = req.userInfo
  console.log(role)
  if(parseInt(role) !== 1) return onFailed(res, 409, "You are not an admin!")
  next()
}

module.exports = { roleAdmin }