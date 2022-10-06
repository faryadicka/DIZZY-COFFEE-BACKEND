const nodemailer = require("nodemailer");
const {
  OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  CLIENT_URL,
} = process.env;

const sendPasswordConfirmation = async (email, confirmCode) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
        clientId: OAUTH_CLIENTID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
      },
    });
    let html = `<div>
  <h5>Dizzy Coffee Forgot Password Confirmation</h5>
  <h6>Here is your account detail :</h6>
  <ul>
    <h6>Email : ${email}</h6>
  </ul>
  <p style='text-align:center'><a href=${CLIENT_URL}/auth/reset/${confirmCode}>Click here</a> to proceed to the next step, thank you.</p>
  <p style='text-align:center'>If you are mobile user please copy this code for reset <big style='font-weight:bolder;'>${confirmCode}</big> </p>
  </div>
  `;

    let mailOptions = {
      from: MAIL_USERNAME,
      to: email,
      subject: "Forgot Password",
      html,
    };
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
    return error.message
  }
};

const sendEmailVerifycation = async (email) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
        clientId: OAUTH_CLIENTID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
      },
    });
    let html = `<div>
  <h5>Portoku Email Verification</h5>
  <h6>Here is your account detail :</h6>
  <ul>
    <h6>Email : ${email}</h6>
  </ul>
  <p style='text-align:center'><a href=${CLIENT_URL}/auth/verify/${email}>Click here</a> to verify your email.</p>
  </div>
  `;

    let mailOptions = {
      from: MAIL_USERNAME,
      to: email,
      subject: "Email Verification",
      html,
    };
    await transport.sendMail(mailOptions);
  } catch (error) {
    return error.message;
  }
};




module.exports = {
  sendPasswordConfirmation,
  sendEmailVerifycation
};
