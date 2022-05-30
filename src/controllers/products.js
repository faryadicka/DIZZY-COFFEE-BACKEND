const {
  getProductsModel,
  insertProductModel,
  updateProductModel,
  deleteProductModel,
  getProductDetailModel,
  getFavoriteProductModel

} = require("../models/products")

const {
  onSuccess,
  onFailed,
  pagination
} = require("../helpers/response")

const getProductsControl = (req, res) => {
  const { query } = req
  getProductsModel(query)
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
      err,
      status,
      message
    }) => {
      onFailed(res, status, message, err)
    })
}

const getFavoriteProductControl = (req, res) => {
  const { query } = req
  getFavoriteProductModel(query)
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
      err,
      status,
      message
    }) => {
      onFailed(res, status, message, err)
    })
}

const insertProductControl = (req, res) => {
  insertProductModel(req.body, req.file)
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
  updateProductModel(req.body, req.params, req.file)
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
  getProductDetailControl,
  getFavoriteProductControl
}