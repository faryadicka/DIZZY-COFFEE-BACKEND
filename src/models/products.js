const db = require("../config/db")

const getProductsModel = (query) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      order,
      sort,
      category,
      maxPrice,
      minPrice,
      page = 1,
      limit = 3
    } = query
    const offset = (Number(page) - 1) * Number(limit)
    let sql = "SELECT p.id, p.name as name, p.price as price, p.start_hour as time, p.image, c.category FROM public.products p JOIN public.category c on p.category_id = c.id "
    let value = []
     if (minPrice && maxPrice) {
      value.push(minPrice, maxPrice)
      sql += "WHERE p.price BETWEEN $1 AND $2"
    }
    if(category && page && !name) {
      if(limit) {
        value.push(category, Number(limit), offset)
      sql += "WHERE c.id = $1 LIMIT $2 OFFSET $3"
      }
    }
    if(name && page && !category) {
      if(limit) {
        value.push(name, Number(limit), offset)
      sql += "WHERE lower(p.name) LIKE lower('%' || $1 || '%') LIMIT $2 OFFSET $3"
      }
    }
    if(category && name && page) {
      value.push(category, name, Number(limit), offset)
      sql += "WHERE c.id = $1 AND lower(p.name) LIKE lower('%' || $2 || '%') LIMIT $3 OFFSET $4"
    }
    if (sort) {
      if(order) {
        sql += " ORDER BY " + sort + " " + order
      }
    }
    if(page && !name && !category) {
      if(limit) {
        value.push(Number(limit), offset)
        sql += "LIMIT $1 OFFSET $2"
      }
    }
    console.log(sql)
    db.query(sql, value, (err, res) => {
      db.query("SELECT COUNT(*) AS total FROM public.products", (err, total) => {
        const totalData = Number(total.rows[0]["total"])
        const totalPage = Math.ceil(totalData/limit)
        const response = {
          query,
          limit,
          data: res.rows,
          message: "List of products",
          status: 200,
          totalData,
          totalPage,
          currentPage: Number(page),
        }
        if(err) return reject({
          message: "Serverl Internal error",
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

const getFavoriteProductModel = () => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT p.id, p.name, p.price, p.image, COUNT(*) AS total FROM public.transactions t JOIN public.products p ON t.products_id = p.id GROUP BY p.id, p.name, p.price, p.image ORDER BY total DESC "
    db.query(sql, (err, res) => {
      if (err) return reject({
        message: "Product no found",
        status: 403,
        err
      })
      return resolve({
        data: res.rows,
        total: res.rowCount,
        message: "Product of Favorite",
        status: 200,
      })
    })
  })
}

const insertProductModel = (body, file) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      price,
      description,
      start,
      end,
      updated,
      categoryId,
      deliveryMethodsId,
      sizeId,
      deliveryInfo
    } = body
    const keyUpload = file
    const image = keyUpload.path.replace("public", "").replace(/\\/g, "/")
    const sql = "INSERT INTO public.products(name, price ,image, description, start_hour, end_hour, updated_at, category_id, delivery_methods_id, size_id ,delivery_info) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *"
    db.query(sql, [name, price, image, description, start, end, updated, categoryId, deliveryMethodsId, sizeId, deliveryInfo], (err, res) => {
      if (err) return reject({
        message: "Insert product failed",
        status: 403,
        err
      })
      return resolve({
        data: res.rows[0],
        message: "Insert product success",
        status: 200,
      })
    })
  })
}

const updateProductModel = (body, params, file) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      price,
      description,
      start,
      end,
      updated,
      categoryId,
      deliveryMethodsId,
      sizeId,
      deliveryInfo
    } = body
    const {
      id
    } = params
    const image = file ? file.path.replace("public", "").replace(/\\/g, "/") : null
    let sql = "UPDATE public.products SET name=COALESCE($1, name ), price=COALESCE($2, price ),description=COALESCE($3, description ), start_hour=COALESCE($4, start_hour ), end_hour=COALESCE($5, end_hour ), updated_at=COALESCE($6, updated_at ), category_id=COALESCE($7, category_id), delivery_methods_id=COALESCE($8, delivery_methods_id ), size_id=COALESCE($9, size_id), delivery_info=COALESCE($10, delivery_info ), image=COALESCE($11, image) WHERE id=$12 RETURNING *"
    db.query(sql, [name, price, description, start, end, updated, categoryId, deliveryMethodsId, sizeId, deliveryInfo, image, id], (err, res) => {
      if (err) return reject({
        message: "Updated failed",
        status: 403,
        err
      })
      if (res.rowCount === 0) return reject({
        message: "Id product not found",
        status: 403,
        err
      })
      return resolve({
        data: res.rows[0],
        message: "Updated data success!",
        status: 200,
      })
    })
  })
}

const deleteProductModel = (params) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = params
    const sql = "DELETE FROM public.products WHERE id= $1 RETURNING *"
    db.query(sql, [id], (err, res) => {
      if (err) return reject({
        message: "Delete product failed",
        status: 403,
        err
      })
      if (res.rows.length === 0) return reject({
        message: "ID product not found",
        status: 403,
        err
      })
      return resolve({
        data: res.rows[0],
        message: "Delete product successS",
        status: 200,
      })
    })
  })
}

const getProductDetailModel = (params) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = params
    let sql = "SELECT name, price, image, description, delivery_info FROM public.products WHERE id=$1"
    db.query(sql, [id], (err, res) => {
      if (err) return reject({
        message: "Product not found",
        status: 403,
        err
      })
      if (res.rows.length === 0) return reject({
        message: "Product not found",
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


module.exports = {
  getProductsModel,
  getProductDetailModel,
  insertProductModel,
  updateProductModel,
  deleteProductModel,
  getFavoriteProductModel
}