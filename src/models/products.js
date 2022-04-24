const db = require("../config/db")

const getAllProductsModel = () => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT p.name, p.price, p.image, p.description, p.start_hour, p.end_hour, p.delivery_info, c.category, s.size, d.delivery_name FROM public.products p join public.category_product c on p.id_category = c.id join public.size_product s on p.id_size = s.id join public.delivery_methods_products d on p.id_delivery_methods = d.id"
    db.query(sql, (err, res) => {
      if (err) return reject({
        message: "Data not found",
        status: 500,
        err
      })
      return resolve({
        message: "List of data products",
        status: 200,
        err: null,
        data: res.rows,
        total: res.rowCount
      })
    })
  })
}

const searchProductByNameModel = (query) => {
  return new Promise((resolve, reject) => {
    const {
      name
    } = query
    const sql = "SELECT p.name, p.price, p.image, p.description, p.start_hour as start, p.end_hour as end, p.delivery_info, c.category, s.size, d.delivery_name FROM public.products p join public.category_product c on p.id_category = c.id join public.size_product s on p.id_size = s.id join public.delivery_methods_products d on p.id_delivery_methods = d.id WHERE lower(p.name) like lower('%' || $1 || '%')"
    db.query(sql, [name], (err, res) => {
      if (err) return reject({
        message: "Data not founds",
        err,
        status: 500
      })
      if (res.length === 0) return reject({
        message: "Data not found",
        err,
        status: 404
      })
      return resolve({
        message: "Data found",
        status: 200,
        err: null,
        data: res.rows[0]
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
      delivery_info
    } = body
    const sql = "INSERT INTO public.products(name, price ,image, description, start_hour, end_hour, updated_at, delivery_info) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"
    db.query(sql, [name, price, image, description, start, end, updated, delivery_info], (err, res) => {
      if (err) return reject({
        message: "Insert product failed",
        status: 403,
        err
      })
      return resolve({
        data: res,
        message: "Insert product success",
        status: 200,
        err: null
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
      updated
    } = body
    const {
      id
    } = params
    const sql = "UPDATE public.products SET name=$1, price=$2, image=$3, description=$4, start_hour=$5, end_hour=$6, updated_at=$7, delivery_info=$8 WHERE id=$9"
    db.query(sql, [name, price, image, description, start, end, updated, id], (err, res) => {
      if (err) return reject({
        message: "Updated failed",
        status: 403,
        err
      })
      return resolve({
        data: res,
        message: "Updated data success!",
        status: 200,
        err: null
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
        err: null
      })
    })
  })
}

const sortProductPriceModel = (query) => {
  return new Promise((resolve, reject) => {
    const {
      sort,
      order
    } = query
    let sql = "SELECT p.name, p.price, p.image, p.description, p.start_hour as start, p.end_hour as end, p.delivery_info, c.category, s.size, d.delivery_name FROM public.products p JOIN public.category_product c on p.id_category = c.id JOIN public.size_product s on p.id_size = s.id JOIN public.delivery_methods_products d on p.id_delivery_methods = d.id"
    if (sort) {
      sql += " ORDER BY p.price " + order
    }
    db.query(sql, (err, res) => {
      if (err) return reject({
        message: "Data sorted failed",
        status: 403,
        err: null
      })
      return resolve({
        data: res.rows,
        total: res.rowCount,
        message: "Data sorted",
        status: 200,
        err: null
      })
    })
  })
}

const sortProductTimeModel = (query) => {
  return new Promise((resolve, reject) => {
    const {
      sort,
      order,
      from,
      to
    } = query
    let sql = "SELECT p.name, p.price, p.image, p.description, p.start_hour as start, p.end_hour as end, p.delivery_info, c.category, s.size, d.delivery_name FROM public.products p JOIN public.category_product c on p.id_category = c.id JOIN public.size_product s on p.id_size = s.id JOIN public.delivery_methods_products d on p.id_delivery_methods = d.id WHERE p.start_hour BETWEEN " + "'" + from + "'" + " and " + "'" + to + "'"
    if (sort) {
      sql += " ORDER BY start " + order
    }
    db.query(sql, (err, res) => {
      if (err) return reject({
        message: "Data not found!",
        status: 403,
        err
      })
      return resolve({
        data: res.rows,
        total: res.rowCount,
        message: "Data sorted",
        status: 200,
        err: null
      })
    })
  })
}

const sortProductTransactionModel = (query) => {
  return new Promise((resolve, reject) => {
    const {
      order
    } = query
    const sql = "SELECT t.product_name, p.price, p.image, count(*) as total FROM public.products p JOIN public.category_product c ON p.id_category = c.id JOIN public.size_product s ON p.id_size = s.id JOIN public.delivery_methods_products d ON p.id_delivery_methods = d.id JOIN public.transactions t ON p.id = t.id_product group by t.product_name, p.price, p.image HAVING COUNT(*) >= 3 ORDER BY total " + order
    db.query(sql, (err, res) => {
      if (err) return reject({
        message: "Data not found",
        status: 404,
        err
      })
      return resolve({
        data: res.rows,
        total: res.rowCount,
        message: "List data of transaction",
        status: 200,
        err: null
      })
    })
  })
}


module.exports = {
  getAllProductsModel,
  searchProductByNameModel,
  insertProductModel,
  updateProductModel,
  deleteProductModel,
  sortProductTimeModel,
  sortProductPriceModel,
  sortProductTransactionModel
}