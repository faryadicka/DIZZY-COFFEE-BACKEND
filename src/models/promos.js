const db = require("../config/db")

const insertPromoModel = (body, file) => {
  return new Promise((resolve, reject) => {
    const {
      discount,
      description,
      availableStart,
      availableEnd,
      updatedAt,
      coupon,
      sizeId,
      productId,
      productName
    } = body
    const image = file ? file.path.replace("public", "").replace(/\\/g, "/") : null
    const sql = "INSERT INTO public.promos (discount, description, available_start, available_end, updated_at, coupon, size_id, products_id, image, products_name) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
    db.query(sql, [discount, description, availableStart, availableEnd, updatedAt, coupon, sizeId, productId, image, productName], (err, res) => {
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
      limit = 3
    } = query
    const offset = (Number(page) - 1) * Number(limit)
    let sql = "SELECT id, products_name, normal_price, coupon ,discount, description, available_start, available_end, image FROM public.promos "
    let value = []
    if (coupon && page) {
      if (limit) {
        value.push(coupon, limit, offset)
        sql = "SELECT id, products_name, normal_price, coupon ,discount, description, available_start, available_end, image FROM public.promos WHERE lower(coupon) like lower('%'|| $1 ||'%') LIMIT $2 OFFSET $3 "
      }
    }
    if (page && !coupon) {
      if (limit) {
        value.push(limit, offset)
        sql += "LIMIT $1 OFFSET $2"
      }
    }
    console.log(sql)
    db.query(sql, value, (err, res) => {
      db.query("SELECT COUNT(*) AS total FROM public.promos", (err, total) => {
        const totalData = Number(total.rows[0]["total"])
        const response = {
          query,
          limit,
          message: "List of promos",
          status: 200,
          data: res.rows,
          totalData,
          currentPage: Number(page)
        }
        if (err) return reject({
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

const updatePromoModel = (body, params, file) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = params
    const {
      discount,
      description,
      availableStart,
      availableEnd,
      updatedAt = Date.now(),
      coupon,
      normalPrice,
      productName
    } = body
    const image = file ? file.path.replace("public", "").replace(/\\/g, "/") : null
    console.log(discount, image, id)
    let sql = "UPDATE public.promos SET product_name=COALESCE($1, product_name), discount=COALESCE($2, discount), description=COALESCE($3, description), available_start=COALESCE($4, available_start), available_end=COALESCE($5, available_end), updated_at=COALESCE($6, updated_at), coupon=COALESCE($7, coupon), normal_price=COALESCE($8, normal_price), image=COALESCE($9, image) WHERE id= $10 RETURNING *"
    db.query(sql, [productName, discount, description, availableStart, availableEnd, updatedAt, coupon, normalPrice, image, id], (err, res) => {
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