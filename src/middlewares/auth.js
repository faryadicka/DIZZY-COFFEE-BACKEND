const jwt = require("jsonwebtoken");
const { onFailed } = require("../helpers/response");
const { SECRET_KEY } = process.env;


const verifyTokenv2 = (req, res, next) => {
  try {
    const bearerToken = req.header("x-access-token");
    let token = null;
    if (bearerToken) {
      token = bearerToken
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    const { id, email, role, name } = decoded;
    req.userInfo = { id, email, role, name };
  } catch (error) {
    onFailed(res, 500, error.message, error);
  }
  next();
};

module.exports = {
  verifyTokenv2
};
