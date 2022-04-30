const db = require("../config/db")

const insertUserModel = (body) => {
  return new Promise((resolve, reject) => {
    const {
      display,
      address,
      phone,
      image,
      birthdate,
      gender,
      firstName,
      lastName,
      updated,
      email,
      password,
      role
    } = body
    const sql = "INSERT INTO public.users(display_name, address, phone, image_profile, birthdate, gender, first_name, last_name, updated_at, email, password, role) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *"
    console.log(sql)
    db.query(sql, [display, address, phone, image, birthdate, gender, firstName, lastName, updated, email, password, role], (err, res) => {
      if (err) return reject({
        message: "Insert data failed",
        status: 403,
        err
      })
      return resolve({
        message: "Insert data success",
        data: res.rows[0],
        status: 200,
      })
    })
  })
}

const getAllUsersModel = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, display_name, address, phone, image_profile, birthdate, gender, first_name, last_name, email, role FROM public.users"
    db.query(sql, (err, res) => {
      if (err) return reject({
        message: "Data not found",
        status: 500,
        err
      })
      return resolve({
        message: "List of data users",
        status: 200,
        data: res.rows,
        total: res.rowCount
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

const updateUserModel = (body, params) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = params
    const {
      display,
      address,
      phone,
      image,
      birthdate,
      gender,
      firstName,
      lastName,
      updated,
      email,
      password,
      role
    } = body
    let sql = "UPDATE public.users SET "
    let value = []
    if (display) {
      value.push(display, id)
      sql += "display_name=$1 WHERE id=$2 "
    }
    if (address) {
      value.push(address, id)
      sql += "address=$1 WHERE id=$2 "
    }
    if (phone) {
      value.push(phone, id)
      sql += "phone=$1 WHERE id=$2 "
    }
    if (image) {
      value.push(image, id)
      sql += "image_profile=$1 WHERE id=$2 "
    }
    if (birthdate) {
      value.push(birthdate, id)
      sql += "birthdate=$1 WHERE id=$2 "
    }
    if (gender) {
      value.push(gender, id)
      sql += "gender=$1 WHERE id=$2 "
    }
    if (firstName) {
      value.push(firstName, id)
      sql += "first_name=$1 WHERE id=$2 "
    }
    if (lastName) {
      value.push(lastName, id)
      sql += "last_name=$1 WHERE id=$2 "
    }
    if (updated) {
      value.push(updated, id)
      sql += "updated_at=$1 WHERE id=$2 "
    }
    if (email) {
      value.push(email, id)
      sql += "email=$1 WHERE id=$2 "
    }
    if (password) {
      value.push(password, id)
      sql += "password=$1 WHERE id=$2 "
    }
    if (role) {
      value.push(role, id)
      sql += "role=$1 WHERE id=$2"
    }
    if (display || address || phone || image || birthdate || gender || firstName || lastName || updated || email || password || role) {
      sql += "RETURNING id, display_name, address, phone, image_profile, birthdate, gender, first_name, last_name, email, role"
    }
    console.log(sql)
    db.query(sql, value, (err, res) => {
      if (err) return reject({
        message: "Update user failed",
        status: 500,
        err
      })
      return resolve({
        data: res.rows,
        message: "Update user success",
        status: 200,
      })
    })
  })
}

module.exports = {
  insertUserModel,
  getAllUsersModel,
  getDetailUserModel,
  updateUserModel
}