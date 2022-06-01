const { check, validationResult } = require("express-validator")
const rulesLogin = [check('email').isEmail().notEmpty().trim().escape(), check('password').notEmpty()]

const validateLogin = [
  rulesLogin,
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        msg: 'Login failed!',
        error: error.array(),
      });
    }
    next();
  },
];

const rulesCreateUsers = [check('email').isEmail().notEmpty().trim().escape(), check('password').notEmpty().isLength({ min: 6 }), check('phone').isNumeric().notEmpty()];

const validateCreateUsers = [
  rulesCreateUsers,
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        msg: 'email, password, and phone number invalid',
      });
    }
    next();
  },
];


module.exports = {
  validateLogin,
  validateCreateUsers,
};