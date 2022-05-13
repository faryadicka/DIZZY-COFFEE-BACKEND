const {
  // insertUserModel,
  getAllUsersModel,
  getDetailUserModel,
  updateUserModel
} = require("../models/users")
const {
  onSuccess,
  onFailed
} = require("../helpers/response")

// const insertUserControl = (req, res) => {
//   insertUserModel(req.body, req.file)
//     .then(({
//       message,
//       data,
//       status,
//       err
//     }) => {
//       onSuccess(res, status, message, err, data)
//     })
//     .catch(({
//       message,
//       status,
//       err
//     }) => {
//       onFailed(res, status, message, err)
//     })
// }

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

const getDetailUserControl = (req, res) => {
  getDetailUserModel(req.params)
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
  updateUserModel(req.body, req.params, req.file)
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
  // insertUserControl,
  getAllUsersControl,
  getDetailUserControl,
  updateUserControl
}