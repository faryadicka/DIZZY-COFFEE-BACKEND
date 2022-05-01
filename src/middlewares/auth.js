const jwt = require("jsonwebtoken")
const db = require("../config/db")
const {
  onFailed,
} = require("../helpers/response")
const {
  SECRET_KEY
} = process.env


const verifyToken = (req, res, next) => {
  const token = req.header("x-access-token")
  const checkBlacklistToken = "SELECT * FROM public.blacklist_token WHERE token = $1"
  db.query(checkBlacklistToken, [token], (err, res) => {
    if (err) return onFailed(res, 500, "Internal sserver error", err)
    if (res.rows.length > 0) onFailed(res, 401, "Invalid Token, You need to login first!", err)
    jwt.verify(token, SECRET_KEY, (err, decode) => {
      if (err) return onFailed(res, 401, "Invalid Token, You need to login first!")
      const {
        id,
        email,
        role
      } = decode
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