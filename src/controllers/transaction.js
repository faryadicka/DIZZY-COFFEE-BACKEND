const {
  insertTransactionModel,
  getAllTransactionModel,
  // updateTransactionModel,
  softDeleteTransactionModel,
  deleteTransactionModel,
  getTransactionDetailModel,
} = require("../models/transaction");
const { onSuccess, onFailed, pagination } = require("../helpers/response");

const insertTransactionControl = async (req, res) => {
  const { id } = req.userInfo;
  try {
    const result = await insertTransactionModel(req.body, id);
    const { message, data, status } = result;
    onSuccess(res, status, message, data);
  } catch (error) {
    const { message, status, err } = error;
    onFailed(res, status, message, err);
  }
};

const getAllTransactionControl = async (req, res) => {
  try {
    const { id } = req.userInfo;
    const { query } = req;
    const result = await getAllTransactionModel(query, id);
    const { limit, currentPage, data, message, status, totalData, totalPage } =
      result;
    pagination(res, req, {
      query,
      limit,
      currentPage,
      data,
      message,
      status,
      totalData,
      totalPage,
    });
  } catch (error) {
    const { message, status, err } = error;
    onFailed(res, status, message, err);
  }
};

const getTransactionDetailControl = async (req, res) => {
  try {
    const result = await getTransactionDetailModel(req.params);
    const { data, message, status } = result;
    onSuccess(res, status, message, data);
  } catch (error) {
    const { message, status, err } = error;
    onFailed(res, status, message, err);
  }
};

const softDeleteTransactionControl = async (req, res) => {
  const { id } = req.userInfo;
  try {
    const result = await softDeleteTransactionModel(id, req.body);
    const { data, message, status } = result;
    onSuccess(res, status, message, data);
  } catch (error) {
    const { message, status, err } = error;
    onFailed(res, status, message, err);
  }
};

// const updateTransactionControl = async (req, res) => {
//   try {
//     const result = await updateTransactionModel(req.body, req.params)
//     const {
//       data,
//       message,
//       status,
//     } = result
//     onSuccess(res, status, message, data)
//   } catch (error) {
//     const {
//       message,
//       status,
//       err
//     } = error
//     onFailed(res, status, message, err)
//   }
// }

const deleteTransactionControl = async (req, res) => {
  try {
    const result = await deleteTransactionModel(req.params);
    const { data, message, status } = result;
    onSuccess(res, status, message, data);
  } catch (error) {
    const { message, status, err } = error;
    onFailed(res, status, message, err);
  }
};
module.exports = {
  insertTransactionControl,
  getAllTransactionControl,
  // updateTransactionControl,
  softDeleteTransactionControl,
  deleteTransactionControl,
  getTransactionDetailControl,
};
