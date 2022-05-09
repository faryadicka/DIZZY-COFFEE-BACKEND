const {
  onFailed
} = require("../helpers/response")

const checkRoleAdmin = (req, res, next) => {
  const {
    role
  } = req.userInfo
  if (role !== "admin") return onFailed(res, 401, "You're not an admin!")
  next()
}

module.exports = {
  checkRoleAdmin
}