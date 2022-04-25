const {
  getProductsModel,
  insertProductModel,
  updateProductModel,
  deleteProductModel,

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
      err
    }) => {
      onSuccess(res, status, message, err, data, total)
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

const updateProductControl = (req, res) => {
  updateProductModel(req.body, req.params)
    .then(({
      data,
      message,
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
      onFailed(res, message, status, err)
    })
}

const deleteProductControl = (req, res) => {
  deleteProductModel(req.params)
    .then(({
      data,
      message,
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


module.exports = {
  getProductsControl,
  insertProductControl,
  updateProductControl,
  deleteProductControl,
}