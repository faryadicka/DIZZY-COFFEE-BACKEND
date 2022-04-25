const db = require("../config/db")

const insertTransactionModel = (body) => {
  return new Promise((resolve, reject) => {
    const {
      product_name,
      quantity,
      payment_methods_id,
      size_id,
      products_id,
      users_id,
      total_id
    } = body
    const sql = "INSERT INTO public.transactions(product_name, quantity, payment_methods_id, size_id, products_id, users_id, total_id)VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *"
    db.query(sql, [product_name, quantity, payment_methods_id, size_id, products_id, users_id, total_id], (err, res) => {
      if (err) return reject({
        message: "Insert data failed",
        status: 404,
        err
      })
      return resolve({
        data: res.rows[0],
        message: "Inser data success",
        status: 200,
        err: null
      })
    })
  })
}

const getAllTransactionModel = () => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT p.name, t.quantity, p.price, pt.subtotal, pt.tax_and_fees, pt.shipping, pt.total, u.display_name, u.address, u.phone FROM public.transactions t JOIN public.products p ON t.products_id = p.id JOIN public.users u ON t.users_id = u.id JOIN public.payment_methods m ON t.payment_methods_id = m.id JOIN public.total pt ON t.total_id = pt.id"
    db.query(sql, (err, res) => {
      if (err) return reject({
        message: "Data not found",
        status: 403,
        err
      })
      return resolve({
        data: res.rows,
        total: res.rowCount,
        message: "Data found",
        status: 200,
        err: null
      })
    })
  })
}

const updateTransactionModel = (body, params) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = params
    const {
      product_name,
      quantity,
      payment_methods_id,
      size_id,
      products_id,
      users_id
    } = body
    const sql = "UPDATE public.transactions SET product_name=$1, quantity=$2, payment_methods_id=$3, size_id=$4, products_id=$5, users_id=$6 WHERE id=$7 RETURNING *"
    db.query(sql, [product_name, quantity, payment_methods_id, size_id, products_id, users_id, id], (err, res) => {
      if (err) return reject({
        message: "Update failed",
        status: 404,
        err
      })
      return resolve({
        data: res.rows[0],
        message: "Update success",
        status: 200,
        err: null
      })
    })
  })
}

const deleteTransactionModel = (params) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = params
    const sql = "DELETE FROM public.transactions WHERE id=$1 RETURNING *"
    db.query(sql, [id], (err, res) => {
      if (err) return reject({
        message: "Delete Failed",
        status: 404,
        err
      })
      return resolve({
        data: res.rows,
        message: "Delete success",
        status: 200,
        err: null
      })
    })
  })
}

module.exports = {
  insertTransactionModel,
  getAllTransactionModel,
  updateTransactionModel,
  deleteTransactionModel
}