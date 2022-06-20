const {
  insertPromoModel,
  getPromosModel,
  updatePromoModel,
  deletePromoModel,
  getPromoByIdModel
} = require("../models/promos")

const {
  onSuccess,
  onFailed,
  pagination
} = require("../helpers/response")

const insertPromoControl = (req, res) => {
  insertPromoModel(req.body, req.file)
    .then(({
      message,
      status,
      data
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

const getPromosControl = (req, res) => {
  const { query } = req
  getPromosModel(query)
    .then(({
      limit,
      query,
      message,
      status,
      data,
      totalData,
      totalPage,
      currentPage
    }) => {
      pagination(res, req, { message, status, data, totalData, totalPage, query, limit, currentPage })
    })
    .catch(({
      message,
      status,
      err
    }) => {
      onFailed(res, status, message, err)
    })
}

const updatePromoControl = (req, res) => {
  updatePromoModel(req.body, req.params, req.file)
    .then(({
      message,
      status,
      err,
      data
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

const deletePromoControl = (req, res) => {
  deletePromoModel(req.params)
    .then(({
      message,
      status,
      err,
      data
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

const getPromoByIdControl = (req, res) => {
  getPromoByIdModel(req.params)
    .then(({
      message,
      status,
      err,
      data
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
  insertPromoControl,
  getPromosControl,
  updatePromoControl,
  deletePromoControl,
  getPromoByIdControl
}