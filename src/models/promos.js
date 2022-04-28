const db = require("../config/db")

const insertPromoModel = (body) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      discount,
      description,
      availableStart,
      availableEnd,
      updatedAt,
      normalPrice,
      coupon,
      sizeId
    } = body
    const sql = "INSERT INTO public.promos (name, discount, description, available_start, available_end, updated_at, normal_price, coupon, size_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *"
    db.query(sql, [name, discount, description, availableStart, availableEnd, updatedAt, normalPrice, coupon, sizeId], (err, res) => {
      if (err) return reject({
        message: "Insert data failed",
        status: 500,
        err
      })
      return resolve({
        message: "Insert data success",
        status: 200,
        data: res.rows[0]
      })
    })
  })
}

const getPromosModel = (query) => {
  return new Promise((resolve, reject) => {
    const {
      coupon
    } = query
    let sql = "SELECT p.id, p.name, p.discount, p.normal_price, p.coupon FROM public.promos p JOIN public.size s ON p.size_id = s.id"
    let value = []
    if (coupon) {
      value.push(coupon)
      sql = "SELECT p.id, p.name, p.discount, p.description, p.available_start, p.available_end, p.normal_price, p.coupon, s.size FROM public.promos p JOIN public.size s ON p.size_id = s.id WHERE lower(p.coupon) like lower('%'|| $1 ||'%')"
    }
    console.log(coupon)
    db.query(sql, value, (err, res) => {
      if (err) return reject({
        message: "Data not found",
        status: 403,
        err
      })
      return resolve({
        message: "Data found",
        status: 200,
        total: res.rowCount,
        data: res.rows
      })
    })
  })
}

const updatePromoModel = (body, params) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = params
    const {
      name,
      discount,
      description,
      availableStart,
      availableEnd,
      updatedAt,
      normalPrice,
      coupon,
      sizeId
    } = body
    let sql = "UPDATE public.promos SET "
    let value = []
    if (name) {
      value.push(name, id)
      sql += "name=$1 WHERE id= $2 RETURNING *"
    }
    if (discount) {
      value.push(discount, id)
      sql += "discount=$1 WHERE id= $2 RETURNING *"
    }
    if (description) {
      value.push(description, id)
      sql += "description=$1 WHERE id= $2 RETURNING *"
    }
    if (availableStart) {
      value.push(availableStart, id)
      sql += "available_start=$1 WHERE id= $2 RETURNING *"
    }
    if (availableEnd) {
      value.push(availableEnd, id)
      sql += "available_end=$1 WHERE id= $2 RETURNING *"
    }
    if (updatedAt) {
      value.push(updatedAt, id)
      sql += "updated_at=$1 WHERE id= $2 RETURNING *"
    }
    if (normalPrice) {
      value.push(normalPrice, id)
      sql += "normal_price=$1 WHERE id= $2 RETURNING *"
    }
    if (coupon) {
      value.push(coupon, id)
      sql += "coupon=$1 WHERE id= $2 RETURNING *"
    }
    if (sizeId) {
      value.push(sizeId, id)
      sql += "size_id=$1 WHERE id= $2 RETURNING *"
    }
    db.query(sql, [name, discount, description, availableStart, availableEnd, updatedAt, normalPrice, coupon, sizeId, id], (err, res) => {
      if (err) return reject({
        message: "Update failed",
        status: 403,
        err
      })
      return resolve({
        message: "Updates success",
        status: 200,
        data: res.rows[0]
      })
    })
  })
}

const deletePromoModel = (params) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = params
    const sql = "DELETE FROM public.promos WHERE id=$1 RETURNING *"
    db.query(sql, [id], (err, res) => {
      if (err) return reject({
        message: "Delete promo failed",
        status: 403,
        err
      })
      return resolve({
        message: "Delete promo success",
        status: 200,
        data: res.rows[0]
      })
    })
  })
}


module.exports = {
  insertPromoModel,
  getPromosModel,
  updatePromoModel,
  deletePromoModel
}