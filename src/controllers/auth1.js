const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  registerUserModel,
  checkEmailDuplicate,
  resetPasswordModel,
  verifyEmailModel,
} = require("../models/auth1");

const {
  sendPasswordConfirmation,
  sendEmailVerifycation,
} = require("../config/nodemailer");

const { client } = require("../config/redis");
const { onFailed, onSuccess } = require("../helpers/response");

var confirmOTP = Math.random();
confirmOTP = confirmOTP * 1000000;
confirmOTP = parseInt(confirmOTP);

const registerUserController = async (req, res) => {
  try {
    const { email, password, phone } = req.body;
    const check = await checkEmailDuplicate(email);
    if (check.rowCount !== 0) {
      return onFailed(res, 409, "email is already use");
    }
    const hashedPass = await bcrypt.hash(password, 10);
    await sendEmailVerifycation(email);
    await registerUserModel(email, hashedPass, phone);
    onSuccess(
      res,
      201,
      "Register succesfully!, please check your email to verify"
    );
  } catch (error) {
    onFailed(res, 500, error.message, error);
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await checkEmailDuplicate(email);
    const result = await bcrypt.compare(password, data.rows[0].password);
    if (!result) {
      return onFailed(res, 400, "Password is wrong!");
    }
    const payload = {
      id: data.rows[0].id,
      email,
      role: data.rows[0].role_id,
      name: data.rows[0].display_name
        ? data.rows[0].display_name
        : "Dear Customer",
    };
    const jwtOption = {
      expiresIn: "1h",
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, jwtOption);
    onSuccess(res, 200, "Login Success", {
      email,
      token,
      role: data.rows[0].role_id,
    });
  } catch (error) {
    onFailed(res, 500, error.message, error);
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    client.set("emailUser", email);
    await sendPasswordConfirmation(email, confirmOTP);
    onSuccess(res, 200, "Please check your email for password confirmation");
  } catch (error) {
    responseError(res, 500, error.message, error);
  }
};

const resetPasswordController = async (req, res) => {
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
    onSuccess(res, 200, '"Reset password successfully"', result);
  } catch (error) {
    onFailed(res, 500, "Reset password failed", error);
  }
};

const verifyEmailController = async (req, res) => {
  try {
    const { email } = req.params;
    await verifyEmailModel(email);
    onSuccess(res, 200, "Congratulation, your email has been verified!");
  } catch (error) {
    onFailed(res, 500, "Verify email failed!", error);
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  forgotPasswordController,
  resetPasswordController,
  verifyEmailController,
};
