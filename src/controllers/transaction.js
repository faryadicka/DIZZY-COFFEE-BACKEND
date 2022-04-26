const {
  insertTransactionModel,
  getAllTransactionModel,
  updateTransactionModel,
  deleteTransactionModel,
  getTransactionDetailModel
} = require("../models/transaction")
const {
  onSuccess,
  onFailed
} = require("../helpers/response")

const insertTransactionControl = async (req, res) => {
  try {
    const result = await insertTransactionModel(req.body)
    const {
      message,
      data,
      err,
      status
    } = result
    onSuccess(res, status, message, err, data)
  } catch (error) {
    const {
      message,
      status,
      err
    } = error
    onFailed(res, status, message, err)
  }
}

const getAllTransactionControl = async (req, res) => {
  try {
    const result = await getAllTransactionModel()
    const {
      total,
      data,
      message,
      status,
      err
    } = result
    onSuccess(res, status, message, err, data, total)
  } catch (error) {
    const {
      message,
      status,
      err
    } = error
    onFailed(res, status, message, err)
  }
}

const getTransactionDetailControl = async (req, res) => {
  try {
    const result = await getTransactionDetailModel(req.params)
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

const updateTransactionControl = async (req, res) => {
  try {
    const result = await updateTransactionModel(req.body, req.params)
    const {
      data,
      message,
      status,
      err
    } = result
    onSuccess(res, status, message, err, data)
  } catch (error) {
    const {
      message,
      status,
      err
    } = error
    onFailed(res, status, message, err)
  }
}

const deleteTransactionControl = async (req, res) => {
  try {
    const result = await deleteTransactionModel(req.params)
    const {
      data,
      message,
      status,
      err
    } = result
    onSuccess(res, status, message, err, data)
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
  insertTransactionControl,
  getAllTransactionControl,
  updateTransactionControl,
  deleteTransactionControl,
  getTransactionDetailControl
}