const {
  getProductsModel,
  insertProductModel,
  updateProductModel,
  deleteProductModel,
  getProductDetailModel,

} = require("../models/products")

const {
  onSuccess,
  onFailed
} = require("../helpers/response")

const getProductsControl = (req, res) => {
  getProductsModel(req.query)
    .then(({
      data,
      total,
      message,
      status,
    }) => {
      onSuccess(res, status, message, data, total)
    })
    .catch(({
      err,
      status,
      message
    }) => {
      onFailed(res, status, message, err)
    })
}

const insertProductControl = (req, res) => {
  insertProductModel(req.body)
    .then(({
      data,
      message,
      status,
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

const updateProductControl = (req, res) => {
  updateProductModel(req.body, req.params)
    .then(({
      data,
      message,
      status,
    }) => {
      onSuccess(res, status, message, data)
    })
    .catch(({
      message,
      status,
      err
    }) => {
      onFailed(res, message, status, err)
    })
}

const deleteProductControl = (req, res) => {
  deleteProductModel(req.params)
    .then(({
      data,
      message,
      status,
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

const getProductDetailControl = (req, res) => {
  getProductDetailModel(req.params)
    .then(({
      data,
      message,
      status
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
  getProductsControl,
  insertProductControl,
  updateProductControl,
  deleteProductControl,
  getProductDetailControl
}