const bcrypt = require("bcrypt");
const db = require("../config/db");

const getEmailUser = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM public.users WHERE email = $1";
    db.query(sqlQuery, [email])
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        if (err)
          return reject({
            message: "Internal Server Error",
            status: 500,
            err,
          });
      });
  });
};

const registerUserModel = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password, phone } = body;
    bcrypt.hash(password, 10, (err, hashed) => {
      if (err)
        return reject({
          message: "Failed to hashing password",
          status: 500,
          err,
        });
      const registerSQL =
        "INSERT INTO public.users(phone, email, password) VALUES($1, $2, $3) RETURNING email, phone";
      db.query(registerSQL, [phone, email, hashed], (err, res) => {
        if (err)
          return reject({
            message: "Register user failed",
            status: 500,
            err,
          });
        return resolve({
          message: "Register successful",
          status: 201,
          data: res.rows[0],
          total: res.rowCount,
        });
      });
    });
  });
};

const getPasswordForCompare = (email) => {
  return new Promise((resolve, reject) => {
    const getEmail = "SELECT * FROM public.users WHERE email = $1";
    db.query(getEmail, [email], (err, res) => {
      if (err)
        return reject({
          message: "Server Intternal error",
          status: 500,
          err,
        });
      if (res.rows.length < 1)
        return reject({
          message: "User not found",
          status: 404,
          err,
        });
      resolve(res.rows[0]);
    });
  });
};

const logoutUserModel = (token) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO public.blacklist_token(token) VALUES($1)";
    db.query(sql, [token], (err, res) => {
      if (err)
        return reject({
          message: "Internal Server Error",
          status: 500,
          err,
        });
      return resolve({
        message: "You have been logged out",
        status: 200,
        data: res,
      });
    });
  });
};

const resetPasswordModel = (newPassword, otp, email) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(newPassword, 10, (err, hashed) => {
      if (err)
        return reject({
          message: "Failed to hashing password",
          status: 500,
          err,
        });
      const sql =
        "UPDATE public.users SET password = $1, otp = $2  WHERE email = $3 RETURNING email, phone";
      db.query(sql, [hashed, otp, email], (err, res) => {
        if (err)
          return reject({
            message: "Update user failed",
            status: 500,
            err,
          });
        return resolve({
          data: res.rows[0],
          message: "Reset password success",
          status: 200,
        });
      });
    });
  });
};

const verifyEmailModel = (email) => {
  return new Promise((resolve, reject) => {
    const SQL = "UPDATE public.users status WHERE email = $1 RETURNING *";
    db.query(SQL, [email], (err, res) => {
      if (err)
        return reject({
          message: "Server Internal Error",
          status: 500,
          err,
        });
      return resolve({
        data: res.rows[0],
        message: "Your Email has been verified. Please Login",
        status: 200,
      });
    });
  });
};

module.exports = {
  getEmailUser,
  registerUserModel,
  logoutUserModel,
  getPasswordForCompare,
  resetPasswordModel,
  verifyEmailModel,
};

// const loginUserModel = (body) => {
//   return new Promise((resolve, reject) => {
//     const {
//       email,
//       password
//     } = body
//     const getEmail = "SELECT * FROM public.users WHERE email = $1"
//     db.query(getEmail, [email], (err, res) => {
//       if (err) return reject({
//         message: "internal server error",
//         status: 500,
//         err
//       })
//       if (res.rows.length < 1) return reject({
//         message: "User not found",
//         status: 404,
//         err
//       })
//       const user = res.rows[0]
//       const hashedPass = user.password
//       bcrypt
//         .compare(password, hashedPass, (err, resCompare) => {
//           if (err) return reject({
//             message: "Internal Server Error",
//             status: 500,
//             err
//           })
//           if (!resCompare) return reject({
//             message: "Password is wrong!",
//             status: 401,
//             err
//           })
//           const payload = {
//             id: user.id,
//             phone: user.phone,
//             email: user.email,
//             role: user.role_id
//           }
//           const expiredPayload = {
//             expiresIn: "10h"
//           }
//           jwt.sign(payload, SECRET_KEY, expiredPayload, (err, token) => {
//             if (err) return reject({
//               message: "Sign payload error",
//               status: 500,
//               err
//             })
//             return resolve({
//               message: "Sign payload success",
//               status: 200,
//               data: {
//                 email,
//                 token,
//               }
//             })
//           })
//         })
//     })
//   })
// }

// const registerUserModel = (body) => {
//   return new Promise((resolve, reject) => {
//     const {
//       email,
//       password,
//       phone
//     } = body
//     const checkEmailSQL = "SELECT * FROM public.users WHERE email = $1"
//     db.query(checkEmailSQL, [email], (err, res) => {
//       if (err) return reject({
//         message: "Internal Server Error",
//         status: 500,
//         err
//       })
//       if (email === "" || password === "" || phone === "") return reject({
//         message: "Field email or password or phone is required!",
//         status: 400,
//         err
//       })
//       if (!email.includes("@gmail.com") && !email.includes("@yahoo.com") && !email.includes("@mail.com")) return reject({
//         message: "Input email is invalid!",
//         status: 400,
//         err
//       })
//       if (res.rowCount > 0) return reject({
//         message: "Email has already exists!",
//         status: 409,
//         err
//       })
//       bcrypt
//         .hash(password, 10, (err, hashed) => {
//           if (err) return reject({
//             message: "Failed to hashing password",
//             status: 500,
//             err
//           })
//           const registerSQL = "INSERT INTO public.users(phone, email, password) VALUES($1, $2, $3) RETURNING email, phone"
//           db.query(registerSQL, [phone, email, hashed], (err, res) => {
//             if (err) return reject({
//               message: "Register user failed",
//               status: 500,
//               err
//             })
//             return resolve({
//               message: "Register successful",
//               status: 201,
//               data: res.rows[0],
//               total: res.rowCount
//             })
//           })
//         })
//     })
//   })
// }
