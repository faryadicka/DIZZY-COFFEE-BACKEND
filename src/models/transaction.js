const db = require("../config/db")

const insertTransactionModel = (body) => {
  return new Promise((resolve, reject) => {
    const {
      productName,
      quantity,
      paymentMethodsId,
      sizeId,
      productsId,
      usersId,
      total,
      subtotal,
      shipping,
      taxAndFees,
      updatedAt
    } = body
    const sql = "INSERT INTO public.transactions(product_name, quantity, payment_methods_id, size_id, products_id, users_id, total, subtotal, shipping, tax_and_fees, updated_at)VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *"
    db.query(sql, [productName, quantity, paymentMethodsId, sizeId, productsId, usersId, total,subtotal, shipping, taxAndFees, updatedAt], (err, res) => {
      if (err) return reject({
        message: "Insert data failed",
        status: 404,
        err
      })
      return resolve({
        data: res.rows[0],
        message: "Insert data success",
        status: 200,
      })
    })
  })
}

const getAllTransactionModel = () => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT t.id, p.name, t.quantity, p.price, s.size, m.pay_method, t.subtotal, t.tax_and_fees, t.shipping, t.total, u.display_name, u.address, u.phone FROM public.transactions t JOIN public.products p ON t.products_id = p.id JOIN public.users u ON t.users_id = u.id JOIN public.payment_methods m ON t.payment_methods_id = m.id JOIN public.size s ON t.size_id = s.id"
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
      })
    })
  })
}

const getTransactionDetailModel = (params) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = params
    let sql = "SELECT p.id, p.name, p.price, p.image, p.description, p.start_hour, p.end_hour, p.delivery_info, c.category, s.size, d.delivery_name FROM public.products p JOIN public.category c ON p.category_id = c.id JOIN public.size s ON p.size_id = s.id JOIN public.delivery_methods d ON p.delivery_methods_id = d.id WHERE p.id=$1"
    db.query(sql, [id], (err, res) => {
      if (err) return reject({
        message: "Product not found",
        status: 403,
        err
      })
      if (res.rows.length > 1 || res.rows.length === 0) return reject({
        message: "Product no found",
        status: 403,
        err
      })
      return resolve({
        data: res.rows[0],
        message: "Product found",
        status: 200,
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
      productName,
      quantity,
      paymentMethodsId,
      sizeId,
      productsId,
      usersId,
      total,
      subtotal,
      shipping,
      taxAndFees,
      updatedAt
    } = body
    let sql = "UPDATE public.transactions SET quantity=$2, payment_methods_id=$3, size_id=$4, products_id=$5, users_id=$6, total=$7, subtotal=$8, shipping=$9, tax_and_fees=$10, updated_at=$11 "
    let value = []
    if (productName) {
      value.push(productName, id)
      sql += "product_name=$1 WHERE id=$2 RETURNING *"
    }
    if (quantity) {
      value.push(quantity, id)
      sql += "quantity=$1 WHERE id=$2 RETURNING *"
    }
    if (paymentMethodsId) {
      value.push(paymentMethodsId, id)
      sql += "payment_methods_id=$1 WHERE id=$2 RETURNING *"
    }
    if (sizeId) {
      value.push(sizeId, id)
      sql += "size_id=$1 WHERE id=$2 RETURNING *"
    }
    if (productsId) {
      value.push(productsId, id)
      sql += "product_name=$1 WHERE id=$2 RETURNING *"
    }
    if (usersId) {
      value.push(usersId)
      sql += "user_id=$1 WHERE id=$2 RETURNING *"
    }
    if (total) {
      value.push(total)
      sql += "total=$1 WHERE id=$2 RETURNING *"
    }
    if (subtotal) {
      value.push(subtotal)
      sql += "subtotal=$1 WHERE id=$2 RETURNING *"
    }
    if (shipping) {
      value.push(shipping)
      sql += "shipping=$1 WHERE id=$2 RETURNING *"
    }
    if (taxAndFees) {
      value.push(taxAndFees)
      sql += "tax_and_fees=$1 WHERE id=$2 RETURNING *"
    }
    if (updatedAt) {
      value.push(updatedAt)
      sql += "upgrade_at=$1 WHERE id=$2 RETURNING *"
    }
    db.query(sql, value, (err, res) => {
      if (err) return reject({
        message: "Update failed",
        status: 404,
        err
      })
      return resolve({
        data: res.rows[0],
        message: "Update success",
        status: 200,
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
      })
    })
  })
}

module.exports = {
  insertTransactionModel,
  getAllTransactionModel,
  getTransactionDetailModel,
  updateTransactionModel,
  deleteTransactionModel
}