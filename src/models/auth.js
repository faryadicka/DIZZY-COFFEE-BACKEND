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
    const checkEmailSQL = "SELECT * FROM public.users WHERE email = $1"
    db.query(checkEmailSQL, [email], (err, res) => {
      if (err) return reject({
        message: "Internal Server Error",
        status: 500,
        err
      })
      if (email === "" || password === "" || phone === "") return reject({
        message: "Field email or password or phone is required!",
        status: 400,
        err
      })
      if (!email.includes("@gmail.com") && !email.includes("@yahoo.com") && !email.includes("@mail.com")) return reject({
        message: "Input email is invalid!",
        status: 400,
        err
      })
      if (res.rowCount > 0) return reject({
        message: "Email has already exists!",
        status: 409,
        err
      })
      bcrypt
        .hash(password, 10, (err, hashed) => {
          if (err) return reject({
            message: "Failed to hashing password",
            status: 500,
            err
          })
          const registerSQL = "INSERT INTO public.users(phone, email, password) VALUES($1, $2, $3) RETURNING email, phone"
          db.query(registerSQL, [phone, email, hashed], (err, res) => {
            if (err) return reject({
              message: "Register user failed",
              status: 500,
              err
            })
            return resolve({
              message: "Register successful",
              status: 201,
              data: res.rows[0],
              total: res.rowCount
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
        message: "User not found",
        status: 500,
        err
      })
      if (res.rows.length > 1) return reject({
        message: "User not found",
        status: 404,
        err
      })
      const user = res.rows[0]
      const hashedPass = user.password
      bcrypt
        .compare(password, hashedPass, (err, resCompare) => {
          if (err) return reject({
            message: "Internal Server Error",
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
            birthdate: user.birthdate,
            gender: user.gender,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
          }
          const expiredSign = {
            expiresIn: "10h"
          }
          jwt.sign(payload, SECRET_KEY, expiredSign, (err, token) => {
            if (err) return reject({
              message: "Sign payload error",
              status: 500,
              err
            })
            return resolve({
              message: "Sign payload success",
              status: 200,
              data: {
                email,
                token,
              }
            })
          })
        })
    })
  })
}

const logoutUserModel = (token) => {
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
  logoutUserModel,
}