const db = require("../config/db")

const insertTransactionModel = (body) => {
  return new Promise((resolve, reject) => {
    const {
      product_name,
      quantity,
      total_price,
      subtotal,
      tax_and_fees,
      shipping,
      address,
      phone,
      id_paymethod,
      id_size,
      id_product
    } = body
    const sql = "INSERT INTO public.transactions(product_name, quantity, total_price, subtotal, tax_and_fees, shipping, address, phone, id_paymethod, id_size, id_product)VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *"
    db.query(sql, [product_name, quantity, total_price, subtotal, tax_and_fees, shipping, address, phone, id_paymethod, id_size, id_product], (err, res) => {
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
    const sql = "SELECT t.product_name, t.quantity, t.total_price, t.subtotal, t.tax_and_fees, t.shipping, t.address, t.phone, p.pay_method FROM public.transactions t JOIN public.payment_method_transaction p ON t.id_paymethod = p.id"
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
      total_price,
      subtotal,
      tax_and_fees,
      shipping,
      address,
      phone,
      id_paymethod,
      id_size
    } = body
    const sql = "UPDATE public.transactions SET product_name=$1, quantity=$2, total_price=$3, subtotal=$4, tax_and_fees=$5, shipping=$6, address=$7, phone=$8, id_paymethod=$9, id_size=$10 WHERE id=$11 RETURNING *"
    db.query(sql, [product_name, quantity, total_price, subtotal, tax_and_fees, shipping, address, phone, id_paymethod, id_size, id], (err, res) => {
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