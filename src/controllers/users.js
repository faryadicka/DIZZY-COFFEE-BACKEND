const {
  // insertUserModel,
  getAllUsersModel,
  getDetailUserModel,
  updateUserModel
} = require("../models/users")
const {
  onSuccess,
  onFailed,
  pagination
} = require("../helpers/response")

const getAllUsersControl = (req, res) => {
  const { query } = req
  getAllUsersModel(query)
    .then(({
      data,
      limit,
      message,
      status,
      totalData,
      totalPage,
      currentPage
    }) => {
      pagination(res, req, { query, data, totalData, totalPage, currentPage, limit, message, status })
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
  const { id } = req.userInfo
  getDetailUserModel(id)
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
  const { id } = req.userInfo
  updateUserModel(req.body, id, req.file)
    .then(({
      message,
      status,
      data,
    }) => {
      onSuccess(res, status, message, data)
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