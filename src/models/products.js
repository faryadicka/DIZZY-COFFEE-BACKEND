const db = require("../config/db")

const getProductsModel = (query) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      favoriteOrder,
      timeOrder,
      priceOrder,
      category
    } = query
    let sql = "SELECT c.category, p.name, p.price as price, p.image FROM public.products p JOIN public.category c on p.category_id = c.id "
    if (favoriteOrder) {
      sql = "SELECT t.product_name, p.price, p.image, COUNT(*) AS total FROM public.transactions t JOIN public.products p ON t.products_id = p.id GROUP BY t.product_name, p.price, p.image ORDER BY total " + favoriteOrder
    }
    let value = []
    if (name) {
      value.push(name)
      sql += "WHERE lower(p.name) LIKE lower('%' || $1 || '%')"
    }
    if (category) {
      value.push(category)
      sql += "WHERE lower(c.category) LIKE lower('%' || $1 || '%')"
    }
    if (priceOrder) {
      sql += "ORDER BY p.price " + priceOrder
    }
    if (timeOrder) {
      sql += "ORDER BY p.start_hour " + timeOrder
    }
    console.log(sql)
    db.query(sql, value, (err, res) => {
      if (err) return reject({
        message: "Data not found",
        status: 403,
        err
      })
      return resolve({
        message: "List of data products",
        status: 200,
        data: res.rows,
        total: res.rowCount
      })
    })
  })
}

const insertProductModel = (body) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      price,
      image,
      description,
      start,
      end,
      updated,
      categoryId,
      deliveryMethodsId,
      sizeId,
      deliveryInfo
    } = body
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

const updateProductModel = (body, params) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      price,
      image,
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
    const sql = "UPDATE public.products SET name=$1, price=$2, image=$3, description=$4, start_hour=$5, end_hour=$6, updated_at=$7, category_id=$8, delivery_methods_id=$9, size_id=$10, delivery_info=$11 WHERE id=$12"
    db.query(sql, [name, price, image, description, start, end, updated, categoryId, deliveryMethodsId, sizeId, deliveryInfo, id], (err, res) => {
      if (err) return reject({
        message: "Updated failed",
        status: 403,
        err
      })
      return resolve({
        data: res.command,
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
    const sql = "DELETE FROM public.products WHERE id= $1"
    db.query(sql, [id], (err, res) => {
      if (err) return reject({
        message: "Delete product failed",
        status: 403,
        err
      })
      return resolve({
        data: res,
        message: "Delete product success",
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


module.exports = {
  getProductsModel,
  getProductDetailModel,
  insertProductModel,
  updateProductModel,
  deleteProductModel,
}