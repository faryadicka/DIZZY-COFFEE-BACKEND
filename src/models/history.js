const db = require("../config/db")

const insertHistoryModel = (query) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      price,
      image,
    } = query
    const sql = "INSERT INTO public.history (name, price, image, status) VALUES ($1, $2, $3, $4) RETURNING *"
    db.query(sql, [name, price, image], (err, res) => {
      if (err) return reject({
        message: "Insert data failed",
        status: 400,
        err
      })
      return resolve({
        data: res.rows[0],
        message: "Insert data success",
        status: 200
      })
    })
  })
}

const getAllHistoriesModel = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT name, price, image FROM public.history"
    db.query(sql, (err, res) => {
      if (err) return reject({
        message: "Product not found",
        status: 403,
        err
      })
      return resolve({
        data: res.rows,
        total: res.rowCount,
        message: "History data list",
        status: 200
      })
    })
  })
}

const updateHistoryModel = (body, params) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = params
    const {
      name,
      price,
      image,
      status
    } = body
    const sql = "UPDATE public.history SET name=$1, price=$2, image=$3, status=$4 WHERE id=$5"
    db.query(sql, [name, price, image, status, id], (err, res) => {
      if (err) return reject({
        message: "Update history failed",
        status: 400,
        err
      })
      return resolve({
        data: res.rows[0],
        message: "Update history success",
        status: 200
      })
    })
  })
}

const deleteHistoryModel = (params) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = params
    const sql = "DELETE FROM public.history WHERE id=$1"
    db.query(sql, [id], (err, res) => {
      if (err) return reject({
        message: "Delete history failed",
        status: 400,
        err
      })
      return resolve({
        data: res.rows[0],
        message: "Delete history success",
        status: 200
      })
    })
  })
}

module.exports = {
  insertHistoryModel,
  getAllHistoriesModel,
  updateHistoryModel,
  deleteHistoryModel
}