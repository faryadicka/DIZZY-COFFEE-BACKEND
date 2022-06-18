const db = require("../config/db");

const getProductsModel = (query) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      order = "desc",
      sort = "name",
      category,
      maxPrice,
      minPrice,
      page = 1,
      limit = 12,
    } = query;
    const offset = (Number(page) - 1) * Number(limit);
    let sql =
      "SELECT p.id, p.name as name, p.price as price, p.start_hour as time, p.image, c.category as category FROM public.products p JOIN public.category c on p.category_id = c.id ";
    let totalSql =
      "SELECT COUNT(p.id) AS total FROM public.products p join category c on p.category_id = c.id ";
    let value = [];
    let totalValue = [];
    if (minPrice && maxPrice && page) {
      if (limit) {
        value.push(minPrice, maxPrice, limit, offset);
        sql += "WHERE price BETWEEN $1 AND $2 LIMIT $3 OFFSET $4";
      }
    }
    if (category && page && sort && !name) {
      if (limit || order) {
        value.push(category, Number(limit), offset);
        totalValue.push(category);
        sql +=
          "WHERE c.id = $1 ORDER BY " +
          sort +
          " " +
          order +
          " LIMIT $2 OFFSET $3";
        totalSql += "WHERE c.id = $1";
      }
    }
    if (name && page && sort && !category) {
      if (limit || order) {
        value.push(name, Number(limit), offset);
        totalValue.push(name);
        sql +=
          "WHERE lower(p.name) LIKE lower('%' || $1 || '%') ORDER BY " +
          sort +
          " " +
          order +
          " LIMIT $2 OFFSET $3";
        totalSql += "WHERE lower(p.name) LIKE lower('%' || $1 || '%')";
      }
    }
    if (category && name && page && sort) {
      if (limit || order) {
        value.push(category, name, Number(limit), offset);
        totalValue.push(category, name);
        sql +=
          "WHERE c.id = $1 AND lower(p.name) LIKE lower('%' || $2 || '%') ORDER BY " +
          sort +
          " " +
          order +
          " LIMIT $3 OFFSET $4";
        totalSql +=
          "WHERE c.id = $1 AND lower(p.name) LIKE lower('%' || $2 || '%')";
      }
    }
    if (sort && !category && !name && !maxPrice && !minPrice) {
      if (order) {
        sql += " ORDER BY " + sort + " " + order;
      }
    }
    if (page && !name && !category && !maxPrice && !minPrice) {
      if (limit) {
        value.push(Number(limit), offset);
        sql += " LIMIT $1 OFFSET $2";
      }
    }
    // console.log(sql);
    db.query(sql, value, (err, res) => {
      db.query(totalSql, totalValue, (err, total) => {
        // console.log(total)
        const totalData = Number(total.rows[0]["total"]) || [];
        const response = {
          query,
          limit,
          data: res.rows,
          message: "List of products",
          status: 200,
          totalData,
          currentPage: Number(page),
        };
        if (err)
          return reject({
            message: "Serverl Internal error",
            status: 500,
            err,
          });
        return resolve(response);
      });
      if (err)
        return reject({
          message: "Data not found",
          status: 403,
          err,
        });
    });
  });
};

const getFavoriteProductModel = (query) => {
  return new Promise((resolve, reject) => {
    const { page = 1, limit = 12 } = query;
    const offset = (Number(page) - 1) * Number(limit);
    let sql =
      "SELECT p.id, p.name, p.price, p.image, COUNT(*) AS total FROM public.transactions t JOIN public.products p ON t.products_id = p.id GROUP BY p.id, p.name, p.price, p.image ORDER BY total DESC LIMIT $1 OFFSET $2";
    let totalSql =
      "select COUNT(*) as total from (SELECT COUNT(*) as total from public.transactions t join public.products p on t.products_id = p.id group by p.name) as favorite";
    db.query(sql, [limit, offset], (err, res) => {
      db.query(totalSql, (err, total) => {
        const totalData = Number(total.rows[0]["total"]);
        const response = {
          query,
          limit,
          data: res.rows,
          message: "List of products",
          status: 200,
          totalData,
          currentPage: Number(page),
        };
        if (err)
          return reject({
            message: "Serverl Internal error",
            status: 500,
            err,
          });
        return resolve(response);
      });
      if (err)
        return reject({
          message: "Product no found",
          status: 403,
          err,
        });
    });
  });
};

const insertProductModel = (body, file) => {
  return new Promise((resolve, reject) => {
    const { name, price, description, start, end, categoryId } =
      body;
    const image = file ? file.path.replace("public", "").replace(/\\/g, "/") : null
    const sql =
      "INSERT INTO public.products(name, price ,image, description, start_hour, end_hour, category_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    console.log(file);
    db.query(
      sql,
      [name, price, image, description, start, end, categoryId],
      (err, res) => {
        console.log()
        if (image === null) {
          return reject({
            message: "You have to upload a picture!",
            status: 400,
            err,
          });
        }
        if (err)
          return reject({
            message: "Create product failed",
            status: 500,
            err,
          });
        return resolve({
          data: res.rows[0],
          message: "Create product success",
          status: 200,
        });
      }
    );
  });
};

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
      deliveryInfo,
    } = body;
    const { id } = params;
    const image = file
      ? file.path.replace("public", "").replace(/\\/g, "/")
      : null;
    let sql =
      "UPDATE public.products SET name=COALESCE($1, name ), price=COALESCE($2, price ),description=COALESCE($3, description ), start_hour=COALESCE($4, start_hour ), end_hour=COALESCE($5, end_hour ), updated_at=COALESCE($6, updated_at ), category_id=COALESCE($7, category_id), delivery_info=COALESCE($8, delivery_info ), image=COALESCE($9, image) WHERE id=$10 RETURNING *";
    db.query(sql, [name, price, description, start, end, updated, categoryId, deliveryInfo, image, id], (err, res) => {
      if (err) return reject({
        message: "Internal server error",
        status: 500,
        err,
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
  });
};

const deleteProductModel = (params) => {
  return new Promise((resolve, reject) => {
    const { id } = params;
    const sql = "DELETE FROM public.products WHERE id= $1 RETURNING *";
    db.query(sql, [id], (err, res) => {
      if (err)
        return reject({
          message: "Delete product failed",
          status: 403,
          err,
        });
      if (res.rows.length === 0)
        return reject({
          message: "ID product not found",
          status: 403,
          err,
        });
      return resolve({
        data: res.rows[0],
        message: "Delete product successS",
        status: 200,
      });
    });
  });
};

const getProductDetailModel = (params) => {
  return new Promise((resolve, reject) => {
    const { id } = params;
    let sql =
      "SELECT id, name, price, image, description, start_hour, end_hour FROM public.products WHERE id=$1";
    db.query(sql, [id], (err, res) => {
      if (err)
        return reject({
          message: "Internal server error",
          status: 500,
          err,
        });
      if (res.rows.length === 0)
        return reject({
          message: "Product not found",
          status: 403,
          err,
        });
      return resolve({
        data: res.rows[0],
        message: "Product found",
        status: 200,
      });
    });
  });
};

module.exports = {
  getProductsModel,
  getProductDetailModel,
  insertProductModel,
  updateProductModel,
  deleteProductModel,
  getFavoriteProductModel,
};
