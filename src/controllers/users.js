const {
  insertUserModel,
  getAllUsersModel,
  getUsersByIdModel,
  updateUserModel
} = require("../models/users")
const {
  onSuccess,
  onFailed
} = require("../helpers/response")

const insertUserControl = (req, res) => {
  insertUserModel(req.body)
    .then(({
      message,
      data,
      status,
      err
    }) => {
      onSuccess(res, status, message, err, data)
    })
    .catch(({
      message,
      status,
      err
    }) => {
      onFailed(res, status, message, err)
    })
}

const getAllUsersControl = (req, res) => {
  getAllUsersModel()
    .then(({
      message,
      status,
      total,
      data,
      err
    }) => {
      onSuccess(res, status, message, err, data, total)
    })
    .catch(({
      message,
      status,
      err
    }) => {
      onFailed(res, status, message, err)
    })
}

const getUsersByIdControl = (req, res) => {
  getUsersByIdModel(req.params)
    .then(({
      message,
      status,
      data,
      err
    }) => {
      onSuccess(res, status, message, err, data)
    })
    .catch(({
      message,
      status,
      err
    }) => {
      onFailed(res, status, message, err)
    })
}

const updateUserControl = (req, res) => {
  updateUserModel(req.body, req.params)
    .then(({
      message,
      status,
      data,
      err
    }) => {
      onSuccess(res, status, message, err, data)
    })
    .catch(({
      message,
      status,
      err
    }) => {
      onFailed(res, status, message, err)
    })
}

module.exports = {
  insertUserControl,
  getAllUsersControl,
  getUsersByIdControl,
  updateUserControl
}