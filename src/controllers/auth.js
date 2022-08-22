const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const generator = require("generate-password");
const {
  registerUserModel,
  loginUserModel,
  getPasswordForCompare,
  resetPasswordModel,
  verifyEmailModel,
  getEmailUser,
} = require("../models/auth");
const {
  sendPasswordConfirmation,
  sendEmailVerifycation,
} = require("../config/nodemailer");
const { onFailed, onSuccess } = require("../helpers/response");
const { client } = require("../config/redis");
var confirmOTP = Math.random();
confirmOTP = confirmOTP * 1000000;
confirmOTP = parseInt(confirmOTP);

const registerUserControl = async (req, res) => {
  try {
    const { email, password, phone } = req.body;
    const checkEmail = await getEmailUser(email);
    if (checkEmail.rowCount !== 0) {
      return onFailed(res, 409, "email is already use");
    }
    const hashedPass = await bcrypt.hash(password, 10);
    await sendEmailVerifycation(email);
    const result = await registerUserModel(email, hashedPass, phone);
    onSuccess(
      res,
      200,
      "Register successfully, please check your email for verification!",
      result.data
    );
  } catch (error) {
    const { message, status, err } = error;
    onFailed(res, status, message, err);
  }
};

const loginUserControl = async (req, res) => {
  try {
    const result = await loginUserModel(req.body);
    const { data, message, status } = result;
    onSuccess(res, status, message, data);
  } catch (error) {
    const { message, status, err } = error;
    onFailed(res, status, message, err);
  }
};

const loginAuthControl = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await getPasswordForCompare(email);
    const result = await bcrypt.compare(password, data.password);
    if (!result) {
      return onFailed(res, 400, "Email or password is wrong!");
    }
    const payload = {
      id: data.id,
      email,
      role: data.role_id,
      name: data.display_name ? data.display_name : "Dear customer",
    };
    const jwtOption = {
      expiresIn: "100000000000s",
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, jwtOption);
    onSuccess(res, 200, "Login Success!", {
      email,
      token,
      role: data.role_id,
    });
  } catch (error) {
    console.log(error, "err");
    const { message, status, err } = error;
    onFailed(res, status, message, err);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    client.set("emailUser", email);
    await sendPasswordConfirmation(email, confirmOTP);
    onSuccess(res, 200, "Please check your email for password confirmation");
  } catch (error) {
    const { message, status } = error;
    onFailed(res, status ? status : 500, message, error);
  }
};

const resetPasswordControl = async (req, res) => {
  try {
    const emailUser = await client.get("emailUser");
    const { otp } = req.params;
    const { newPassword } = req.body;
    console.log("ConfirmOtp :", confirmOTP);
    console.log("otp :", Number(otp));
    console.log(emailUser);
    if (Number(otp) !== confirmOTP)
      return onFailed(res, 401, "OTP code invalid, please resend link!");
    const result = await resetPasswordModel(
      newPassword,
      Number(otp),
      emailUser
    );
    const { message, status, data } = result;
    onSuccess(res, status, message, data);
  } catch (error) {
    const { message, status, err } = error;
    onFailed(res, status, message, err);
  }
};

const verifyEmailControl = async (req, res) => {
  try {
    const { email } = req.params;
    await verifyEmailModel(email);
    onSuccess(res, 200, "Congratulation, your email has been verified!");
  } catch (error) {
    onFailed(res, 500, "Verify email failed!", error);
  }
};

module.exports = {
  registerUserControl,
  loginUserControl,
  loginAuthControl,
  forgotPassword,
  resetPasswordControl,
  verifyEmailControl,
};
