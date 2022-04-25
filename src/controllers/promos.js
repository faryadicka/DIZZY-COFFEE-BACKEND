const {
  insertPromoModel,
  getPromosModel,
  updatePromoModel,
  deletePromoModel
} = require("../models/promos")

const {
  onSuccess,
  onFailed
} = require("../helpers/response")

const insertPromoControl = (req, res) => {
  insertPromoModel(req.body)
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

const getPromosControl = (req, res) => {
  getPromosModel(req.query)
    .then(({
      message,
      status,
      err,
      data,
      total
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

const updatePromoControl = (req, res) => {
  updatePromoModel(req.body, req.params)
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

module.exports = {
  insertPromoControl,
  getPromosControl,
  updatePromoControl,
  deletePromoControl
}