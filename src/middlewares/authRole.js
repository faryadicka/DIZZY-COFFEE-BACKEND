const {
  onFailed
} = require("../helpers/response")

const checkRoleAdmin = (req, res, next) => {
  const {
    role
  } = req.userInfo
  if (role !== "admin") return onFailed(res, 401, "You're no an admin!")
  next()
}

module.exports = {
  checkRoleAdmin
}