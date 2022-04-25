const db = require("../config/db")

const getProductsModel = (query) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      from,
      to,
      order,
      sort
    } = query
    let sql = "SELECT name, price, image FROM public.products "
    if (order) {
      sql = "SELECT t.product_name, p.price, p.image, COUNT(*) AS total FROM public.transactions t JOIN public.products p ON t.products_id = p.id GROUP BY t.product_name, p.price, p.image ORDER BY total " + order
    }
    let value = []
    if (name) {
      value.push(name)
      sql += "WHERE lower(name) LIKE lower('%' || $1 || '%')"
    }
    if (from && to) {
      value.push(from, to)
      sql += "WHERE start_hour BETWEEN $1 AND $2"
    }
    if (sort) {
      sql += "ORDER BY price " + sort
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
        err: null,
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
      category_id,
      delivery_methods_id,
      size_id,
      delivery_info
    } = body
    const sql = "INSERT INTO public.products(name, price ,image, description, start_hour, end_hour, updated_at, category_id, delivery_methods_id, size_id ,delivery_info) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *"
    db.query(sql, [name, price, image, description, start, end, updated, category_id, delivery_methods_id, size_id, delivery_info], (err, res) => {
      if (err) return reject({
        message: "Insert product failed",
        status: 403,
        err
      })
      return resolve({
        data: res.rows[0],
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
      updated,
      category_id,
      delivery_methods_id,
      size_id,
      delivery_info
    } = body
    const {
      id
    } = params
    const sql = "UPDATE public.products SET name=$1, price=$2, image=$3, description=$4, start_hour=$5, end_hour=$6, updated_at=$7, category_id=$8, delivery_methods_id=$9, size_id=$10, delivery_info=$11 WHERE id=$12"
    db.query(sql, [name, price, image, description, start, end, updated, category_id, delivery_methods_id, size_id, delivery_info, id], (err, res) => {
      if (err) return reject({
        message: "Updated failed",
        status: 403,
        err
      })
      return resolve({
        data: res.command,
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




module.exports = {
  getProductsModel,
  insertProductModel,
  updateProductModel,
  deleteProductModel,

}


// let sql = "SELECT p.name, p.price, p.image, p.description, p.start_hour as start, p.end_hour as end, p.delivery_info, c.category, s.size, d.delivery_name FROM public.products p join public.category_product c on p.id_category = c.id join public.size s on p.id_size = s.id join public.delivery_methods d on p.id_delivery_methods = d.id "