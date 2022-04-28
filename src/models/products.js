const db = require("../config/db")

const getProductsModel = (query) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      order,
      sort,
      category,
      maxPrice,
      minPrice
    } = query
    let sql = "SELECT p.id, p.name, p.price as price, p.start_hour as time, p.image FROM public.products p JOIN public.category c on p.category_id = c.id "
    let value = []
    if (name) {
      value.push(name)
      sql += "WHERE lower(p.name) LIKE lower('%' || $1 || '%')"
    }
    if (category) {
      value.push(category)
      sql += "WHERE lower(c.category) LIKE lower('%' || $1 || '%')"
    }
    if (maxPrice && maxPrice) {
      value.push(minPrice, maxPrice)
      sql += "WHERE p.price BETWEEN $1 AND $2"
    }
    if (sort) {
      sql += "ORDER BY " + sort + " " + order
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

const getFavoriteProductModel = () => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT p.id, p.name, p.price, p.image, COUNT(*) AS total FROM public.transactions t JOIN public.products p ON t.products_id = p.id GROUP BY p.id, p.name, p.price, p.image ORDER BY total DESC"
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
    let sql = "UPDATE public.products SET "
    let value = []
    if (name) {
      value.push(name, id)
      sql += "name=$1 WHERE id=$2 RETURNING *"
    }
    if (price) {
      value.push(price, id)
      sql += "price=$1 WHERE id=$2 RETURNING *"
    }
    if (image) {
      value.push(image, id)
      sql += "image=$1 WHERE id=$2 RETURNING *"
    }
    if (description) {
      value.push(description, id)
      sql += "description=$1 WHERE id=$2 RETURNING *"
    }
    if (start) {
      value.push(start, id)
      sql += "start_hour=$1 WHERE id=$2 RETURNING *"
    }
    if (end) {
      value.push(end, id)
      sql += "end_hour=$1 WHERE id=$2 RETURNING *"
    }
    if (updated) {
      value.push(updated, id)
      sql += "updated_at=$1 WHERE id=$2 RETURNING *"
    }
    if (categoryId) {
      value.push(categoryId, id)
      sql += "category_id=$1 WHERE id=$2 RETURNING *"
    }
    if (deliveryMethodsId) {
      value.push(deliveryMethodsId, id)
      sql += "delivery_methods_id=$1 WHERE id=$2 RETURNING *"
    }
    if (sizeId) {
      value.push(sizeId, id)
      sql += "size_id=$1 WHERE id=$2 RETURNING *"
    }
    if (deliveryInfo) {
      value.push(deliveryInfo, id)
      sql += "delivery_info=$1 WHERE id=$2 RETURNING *"
    }
    console.log(sql)
    db.query(sql, value, (err, res) => {
      if (err) return reject({
        message: "Updated failed",
        status: 403,
        err
      })
      if (res.rows.length === 0) return reject({
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