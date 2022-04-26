const {
  insertHistoryModel,
  getAllHistoriesModel,
  updateHistoryModel,
  deleteHistoryModel
} = require("../models/history")

const {
  onFailed,
  onSuccess
} = require("../helpers/response")

const insertHistoryControl = async (req, res) => {
  try {
    const result = await insertHistoryModel(req.body)
    const {
      data,
      message,
      status
    } = result
    onSuccess(res, status, message, data)
  } catch (error) {
    const {
      status,
      message,
      err
    } = error
    onFailed(res, status, message, err)
  }
}

const getALLHistoriesControl = async (req, res) => {
  try {
    const result = await getAllHistoriesModel()
    const {
      data,
      total,
      message,
      status
    } = result
    onSuccess(res, status, message, data, total)
  } catch (error) {
    const {
      status,
      message,
      err
    } = error
    onFailed(res, status, message, err)
  }
}

const updateHistoryControl = async (req, res) => {
  try {
    const result = await updateHistoryModel(req.body, req.params)
    const {
      data,
      message,
      status
    } = result
    onSuccess(res, status, message, data)
  } catch (error) {
    const {
      status,
      message,
      err
    } = error
    onFailed(res, status, message, err)
  }
}

const deleteHistoryControl = async (req, res) => {
  try {
    const result = await deleteHistoryModel(req.params)
    const {
      data,
      message,
      status
    } = result
    onSuccess(res, status, message, data)
  } catch (error) {
    const {
      status,
      message,
      err
    } = error
    onFailed(res, status, message, err)
  }
}

module.exports = {
  insertHistoryControl,
  getALLHistoriesControl,
  updateHistoryControl,
  deleteHistoryControl
}