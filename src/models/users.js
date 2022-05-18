const db = require("../config/db")

// const insertUserModel = (body, file) => {
//   return new Promise((resolve, reject) => {
//     const {
//       display,
//       address,
//       phone,
//       birthdate,
//       gender,
//       firstName,
//       lastName,
//       updated,
//       email,
//       password,
//       role
//     } = body
//     const {image} = file
//     const sql = "INSERT INTO public.users(display_name, address, phone, image_profile, birthdate, gender, first_name, last_name, updated_at, email, password, role) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *"
//     console.log(sql)
//     db.query(sql, [display, address, phone, image, birthdate, gender, firstName, lastName, updated, email, password, role], (err, res) => {
//       if (err) return reject({
//         message: "Insert data failed",
//         status: 403,
//         err
//       })
//       return resolve({
//         message: "Insert data success",
//         data: res.rows[0],
//         status: 200,
//       })
//     })
//   })
// }

const getAllUsersModel = (query) => {
  return new Promise((resolve, reject) => {
    const {page, limit} = query
    const offset = (Number(page) - 1) * Number(limit)
    const sql = "SELECT id, display_name, address, phone, image_profile, birthdate, gender, first_name, last_name, email FROM public.users LIMIT $1 OFFSET $2"
    db.query(sql, [limit, offset], (err, res) => {
      db.query("SELECT COUNT(*) AS total FROM public.users", (err, total) => {
        const totalData = Number(total.rows[0]["total"])
        const totalPage = Math.ceil(res.rowCount/limit)
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
        if (err) return reject({
          message: "Server Internal Error",
          status: 500,
          err
        })
        return resolve(response)
      })
      if (err) return reject({
        message: "Servel internal Error",
        status: 500,
        err
      })
    })
  })
}

const getDetailUserModel = (params) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = params
    const sql = "SELECT display_name, address, phone, image_profile, birthdate, gender, first_name, last_name, email, role FROM public.users WHERE id = $1"
    db.query(sql, [id], (err, res) => {
      if (err) return reject({
        message: "Data not found",
        status: 500,
        err
      })
      if (res.length === 0) return reject({
        message: "Data not found",
        status: 404,
        err
      })
      return resolve({
        message: "Data found",
        status: 200,
        data: res.rows[0]
      })
    })
  })
}

const updateUserModel = (body, params, file) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = params
    const {
      display,
      address,
      phone,
      birthdate,
      gender,
      firstName,
      lastName,
      updated,
      email,
      password,
    } = body
    const image = file ? file.path.replace("public", "").replace(/\\/g, "/") : null
    let sql = "UPDATE public.users SET display_name=COALESCE($1, display_name), address=COALESCE($2, address), phone=COALESCE($3, phone), birthdate=COALESCE($4, birthdate), gender=COALESCE($5, gender), first_name=COALESCE($6,first_name), last_name=COALESCE($7, last_name), updated_at=COALESCE($8, updated_at), email=COALESCE($9, email), password=COALESCE($10,password), image_profile=COALESCE($11, image_profile) WHERE id=$12 RETURNING display_name, image_profile, address, phone, birthdate, gender, first_name, last_name, updated_at, email"
    console.log(sql)
    db.query(sql, [display, address, phone, birthdate, gender, firstName,lastName, updated, email, password, image, id], (err, res) => {
      if (err) return reject({
        message: "Update user failed",
        status: 500,
        err
      })
      return resolve({
        data: res.rows[0],
        message: "Update user success",
        status: 200,
      })
    })
  })
}

module.exports = {
  // insertUserModel,
  getAllUsersModel,
  getDetailUserModel,
  updateUserModel
}