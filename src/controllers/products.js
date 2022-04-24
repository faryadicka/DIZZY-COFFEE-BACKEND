const {
  getAllProductsModel,
  searchProductByNameModel,
  insertProductModel,
  updateProductModel,
  deleteProductModel,
  sortProductTimeModel,
  sortProductPriceModel,
  sortProductTransactionModel
} = require("../models/products")

const {
  onSuccess,
  onFailed
} = require("../helpers/response")

const getAllProductsControl = (req, res) => {
  getAllProductsModel()
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

const searchProductByNameControl = (req, res) => {
  searchProductByNameModel(req.query).then(({
    status,
    message,
    err,
    data
  }) => {
    onSuccess(res, status, message, err, data)
  }).catch(({
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

const sortProductPriceControl = (req, res) => {
  sortProductPriceModel(req.query)
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
      message,
      status,
      err
    }) => {
      onFailed(res, status, message, err)
    })
}

const sortProductTimeControl = (req, res) => {
  sortProductTimeModel(req.query)
    .then(({
      data,
      total,
      message,
      err,
      status
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

const sortProductTransactionContol = (req, res) => {
  sortProductTransactionModel(req.query)
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
      message,
      status,
      err
    }) => {
      onFailed(res, status, message, err)
    })
}

module.exports = {
  getAllProductsControl,
  searchProductByNameControl,
  insertProductControl,
  updateProductControl,
  deleteProductControl,
  sortProductTimeControl,
  sortProductPriceControl,
  sortProductTransactionContol
}