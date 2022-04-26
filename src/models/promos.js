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
    let sql = "SELECT p.name, p.discount, p.normal_price FROM public.promos p JOIN public.size s ON p.size_id = s.id"
    let value = []
    if (coupon) {
      value.push(coupon)
      sql = "SELECT p.name, p.discount, p.description, p.available_start, p.available_end, p.normal_price, p.coupon, s.size FROM public.promos p JOIN public.size s ON p.size_id = s.id WHERE lower(p.coupon) like lower('%'|| $1 ||'%')"
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
    const sql = "UPDATE public.promos SET name=$1, discount=$2, description=$3, available_start=$4, available_end=$5, updated_at=$6, normal_price=$7, coupon=$8, size_id=$9 WHERE id= $10 RETURNING *"
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