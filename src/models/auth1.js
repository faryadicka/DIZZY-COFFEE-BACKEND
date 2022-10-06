const db = require("../config/db");

const registerUserModel = (email, password, phone) => {
    return new Promise((resolve, reject) => {
      const registerSQL =
        "INSERT INTO public.users(phone, email, password) VALUES($1, $2, $3) RETURNING email, phone";
      db.query(registerSQL, [phone, email, password], (err, res) => {
        if (err){
            return reject(err);
        }
        return resolve(res);
      });
    });
  };


  const checkEmailDuplicate = (email) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM public.users WHERE email = $1'
        db.query(sql, [email], (err, res) => {{}
            if(err) {
                return reject(err)
            }
            return resolve(res)
        })
    })
  }

  const resetPasswordModel = (newPassword, otp, email) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE public.users SET password = $1, otp = $2 WHERE email = $3 RETURNING email, phone'
        db.query(sql, [newPassword, otp, email], (err, res) => {
            if(err) {
               return reject(err)
            }
            return resolve(res)
        })
    })
  }

  const verifyEmailModel = (email) => {
    return new Promise((resolve, reject) => {
      const SQL = "UPDATE public.users SET status = 'verified' WHERE email = $1";
      db.query(SQL, [email], (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  };

  module.exports = { registerUserModel, checkEmailDuplicate, resetPasswordModel, verifyEmailModel }