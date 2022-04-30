const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../config/db")

const {
  SECRET_KEY
} = process.env

const registerUserModel = (body) => {
  return new Promise((resolve, reject) => {
    const {
      email,
      password,
      phone
    } = body
    const checkEmail = "SELECT * FROM public.users WHERE email = $1"
    db.query(checkEmail, [email], (err, res) => {
      if (err) return reject({
        message: "Internar Server Error",
        status: 500,
        err
      })
      if (email === "" || password === "" || phone === "") return reject({
        message: "Field email/password/phone is required!",
        status: 428,
        err
      })
      if (!email.includes("@gmail.com") && !email.includes("@yahoo.com") && !email.includes("@mail.com")) return reject({
        message: "Input email isnt valid",
        status: 401,
        err
      })
      if (res.rows.length > 0) return reject({
        message: "Email has already exists!",
        status: 409,
        err
      })
      const sql = "INSERT INTO public.users(phone, email, password) VALUES($1, $2, $3) RETURNING email, phone"
      bcrypt
        .hash(password, 10, (err, hashed) => {
          if (err) return reject({
            message: "Invalid hashing password!",
            status: 500,
            err
          })
          db.query(sql, [phone, email, hashed], (err, res) => {
            if (err) return reject({
              message: "Register failed",
              status: 400,
              err
            })
            return resolve({
              message: "Register success",
              status: 201,
              data: res.rows[0]
            })
          })
        })
    })
  })
}

const loginUserModel = (body) => {
  return new Promise((resolve, reject) => {
    const {
      email,
      password
    } = body
    const getEmail = "SELECT * FROM public.users WHERE email = $1"
    db.query(getEmail, [email], (err, res) => {
      if (err) return reject({
        message: "User not found!",
        status: 404,
        err
      })
      if (res.rows.length === 0) return reject({
        message: "User not found!",
        status: 403,
        err
      })
      const user = res.rows[0]
      const hashedPass = user.password
      bcrypt
        .compare(password, hashedPass, (err, resCompare) => {
          if (err) return reject({
            message: "Internal server bad",
            status: 500,
            err
          })
          if (!resCompare) return reject({
            message: "Password is wrong!",
            status: 401,
            err
          })
          const payload = {
            id: user.id,
            display_name: user.display_name,
            address: user.address,
            phone: user.phone,
            image_profile: user.image_profile,
            birthdate: user.birthdate,
            gender: user.gender,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          }
          const limit = {
            expiresIn: "10h"
          }
          jwt.sign(payload, SECRET_KEY, limit, (err, token) => {
            if (err) return reject({
              message: "Sign token failed",
              status: 500,
              err
            })
            return resolve({
              data: res.rows,
              message: token,
              status: 200
            })
          })
        })
    })
  })
}

const logoutUser = (token) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO public.blacklist_token(token) VALUES($1)"
    db.query(sql, [token], (err, res) => {
      if (err) return reject({
        message: "Server Bab Internal",
        status: 500,
        err
      })
      return resolve({
        message: "You have been logged out",
        status: 200,
        data: res
      })
    })
  })
}
module.exports = {
  registerUserModel,
  loginUserModel,
  logoutUser
}