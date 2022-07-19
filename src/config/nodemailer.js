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
  <h5>Dizzy Coffee Forgot Password Confirmation</h5>
  <h6>Hi, ${name}</h6>
  <h6>Here is your account detail :</h6>
  <ul>
    <h6>Name : ${name}</h6>
    <h6>Email : ${email}</h6>
  </ul>
  <p>Click the link below to proceed to the next step, thank you.</p>
  <p><a href=${CLIENT_URL}/auth/forgot/${confirmCode}>Click here</a></p>
  <p>If you are mobile user please copy this code for reset <strong>${confirmCode}</strong> </p>
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
