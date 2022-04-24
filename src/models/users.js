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
      updated
    } = body
    const sql = "INSERT INTO public.users(display_name, address, phone, image_profile, birthdate, gender, first_name, last_name, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *"
    db.query(sql, [display, address, phone, image, birthdate, gender, firstName, lastName, updated], (err, res) => {
      if (err) return reject({
        message: "Insert data failed",
        status: 403,
        err
      })
      return resolve({
        message: "Insert data success",
        data: res.rows[0],
        status: 200,
        err: null
      })
    })
  })
}

const getAllUsersModel = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT display_name, address, phone, image_profile, birthdate, gender, first_name, last_name, username, email FROM public.users"
    db.query(sql, (err, res) => {
      if (err) return reject({
        message: "Data not found",
        status: 500,
        err
      })
      return resolve({
        message: "List of data users",
        status: 200,
        err: null,
        data: res.rows,
        total: res.rowCount
      })
    })
  })
}

const getUsersByIdModel = (params) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = params
    const sql = "SELECT display_name, address, phone, image_profile, birthdate, gender, first_name, last_name, username, email FROM public.users WHERE id = $1"
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
        err: null,
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
      updated
    } = body
    const sql = "UPDATE public.users SET display_name=$1, address=$2, phone=$3, image_profile=$4, birthdate=$5, gender=$6, first_name=$7, last_name=$8, updated_at=$9 WHERE id=$10 RETURNING *"
    db.query(sql, [display, address, phone, image, birthdate, gender, firstName, lastName, updated, id], (err, res) => {
      if (err) return reject({
        message: "Update user failed",
        status: 500,
        err
      })
      return resolve({
        data: res.rows,
        message: "Update user success",
        status: 200,
        err: null
      })
    })
  })
}

const deleteUserModel = (params) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = params
    const sql = "DELETE FROM public.users WHERE id= $1 RETURNING *"
    db.query(sql, [id], (err, res) => {
      if (err) return reject({
        message: "Delete user failed",
        status: 404,
        err
      })
      return resolve({
        data: res.rows,
        message: "Delete user success",
        status: 200,
        err: null
      })
    })
  })
}

module.exports = {
  insertUserModel,
  getAllUsersModel,
  getUsersByIdModel,
  updateUserModel,
  deleteUserModel
}