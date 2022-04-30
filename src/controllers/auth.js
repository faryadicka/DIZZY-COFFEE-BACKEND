const {
  registerUserModel,
  loginUserModel
} = require("../models/auth")

const {
  onFailed,
  onSuccess
} = require("../helpers/response")

const registerUserControl = async (req, res) => {
  try {
    const result = await registerUserModel(req.body)
    const {
      data,
      message,
      status
    } = result
    onSuccess(res, status, message, data)
  } catch (error) {
    const {
      message,
      status,
      err
    } = error
    onFailed(res, status, message, err)
  }
}

const loginUserControl = async (req, res) => {
  try {
    const result = await loginUserModel(req.body)
    const {
      data,
      message,
      status
    } = result
    onSuccess(res, status, message, data)
  } catch (error) {
    const {
      message,
      status,
      err
    } = error
    onFailed(res, status, message, err)
  }
}

module.exports = {
  registerUserControl,
  loginUserControl
}