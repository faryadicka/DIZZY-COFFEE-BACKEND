const db = require("../config/db")

const insertPromoModel = (body) => {
  return new Promise((resolve, reject) => {
    const {
      discount,
      description,
      availableStart,
      availableEnd,
      updatedAt,
      coupon,
      sizeId,
      productId
    } = body
    const sql = "INSERT INTO public.promos (discount, description, available_start, available_end, updated_at, coupon, size_id, products_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"
    db.query(sql, [discount, description, availableStart, availableEnd, updatedAt, coupon, sizeId, productId], (err, res) => {
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
      coupon,
      page = 1,
      limit =3
    } = query
    const offset = (Number(page) - 1) * Number(limit)
    let sql = "SELECT p.id, pr.name, p.discount, pr.price, p.coupon FROM public.promos p JOIN public.size s ON p.size_id = s.id JOIN public.products pr ON p.products_id = pr.id "
    let value = []
    if (coupon && page) {
      if(limit) {
        value.push(coupon, limit, offset)
      sql = "SELECT p.id, pr.name, p.discount, p.description, p.available_start, p.available_end, pr.price, p.coupon, s.size FROM public.promos p JOIN public.size s ON p.size_id = s.id JOIN public.products pr ON p.products_id = pr.id WHERE lower(p.coupon) like lower('%'|| $1 ||'%') LIMIT $2 OFFSET $3 "
      }
    }
    if(page && !coupon) {
      if(limit) {
        value.push(limit, offset)
        sql += "LIMIT $1 OFFSET $2"
      }
    }
    console.log(sql)
    db.query(sql, value, (err, res) => {
      db.query("SELECT COUNT(*) AS total FROM public.promos", (err, total) => {
        const totalData = Number(total.rows[0]["total"])
        const totalPage = Math.ceil(totalData/limit)
        const response = {
          query,
          limit,
          message: "List of promos",
          status: 200,
          data: res.rows,
          totalData,
          totalPage,
          currentPage: Number(page)
        }
        if(err) return reject({
          message: "Internal server error",
          status: 500,
          err
        })
        return resolve(response)
      })
      if (err) return reject({
        message: "Data not found",
        status: 403,
        err
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
      discount,
      description,
      availableStart,
      availableEnd,
      updatedAt,
      coupon,
      sizeId,
      productId
    } = body
    let sql = "UPDATE public.promos SET "
    let value = []
    if (productId) {
      value.push(productId, id)
      sql += "products_id=$1 WHERE id= $2 RETURNING *"
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
    if (coupon) {
      value.push(coupon, id)
      sql += "coupon=$1 WHERE id= $2 RETURNING *"
    }
    if (sizeId) {
      value.push(sizeId, id)
      sql += "size_id=$1 WHERE id= $2 RETURNING *"
    }
    db.query(sql, value, (err, res) => {
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
    const sql = "DELETE FROM public.promos id=$1 RETURNING *"
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