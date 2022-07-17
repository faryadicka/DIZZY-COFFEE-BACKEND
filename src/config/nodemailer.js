const nodemailer = require("nodemailer");
const {
  OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  CLIENT_URL,
} = process.env;

const sendPasswordConfirmation = async (name, email, confirmCode) => {
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
  <h4>Dizzy Coffee Forgot Password Confirmation</h4>
  <h5>Hi, ${name}</h5>
  <h5>Here is your account detail :</h5>
  <ul>
    <h5>Name : ${name}</h5>
    <h5>Email : ${email}</h5>
  </ul>
  <h5>Click the link below to proceed to the next step, thank you.</h5>
  <h5><a href=${CLIENT_URL}/auth/forgot/${confirmCode}>Click here to reset your password</a></h5>
  <p>If you are mobile user please copy this code for reset ${confirmCode} </p>
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
  }
};

module.exports = {
  sendPasswordConfirmation,
};
