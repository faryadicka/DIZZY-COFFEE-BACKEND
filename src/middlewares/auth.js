const jwt = require("jsonwebtoken")
const db = require("../config/db")
const {
  onFailed,
} = require("../helpers/response")
const {
  SECRET_KEY
} = process.env


const verifyToken = (req, res, next) => {
  const token = req.header('x-access-token')
  const sqlTokenBlackList = "SELECT token FROM blacklist_token WHERE token = $1"
  db.query(sqlTokenBlackList, [token], (err, results) => {
    if (err) return onFailed(res, 500, "Token Invalid")
    if (results.rows.length > 0) return onFailed(res, 400, "Token Expired, You need to login first!")

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return onFailed(res, 400, "Token Invalid, You need to login first!", err)
      const {
        id,
        email,
        role
      } = decoded
      req.userInfo = {
        id,
        email,
        role
      }
      next()
    })
  })
}

module.exports = {
  verifyToken
}