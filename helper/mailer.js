const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // true for port 465, false for other ports
  logger: true,
  secureConnection: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_KEY,
  },
  tls: {
    rejectUnAuthorized: true,
  },
});

const sendEmail = async (options) => {
  console.log(process.env.SMTP_MAIL);
  console.log(process.env.SMTP_KEY);

  console.log(options);
  try {
    const mailOptions = {
      from: process.env.SMTP_MAIL, // sender address
      to: options.to, // list of receivers
      subject: "Registration email", // Subject line
      text: "Registration Successful", // plain text body
      html: options.html,
    };

    const mailInfo = await transporter.sendMail(mailOptions);
    console.log("mail sent", mailInfo.response);
  } catch (error) {
    console.error("Error: No recipients defined", error);
  }
};

module.exports = sendEmail;
