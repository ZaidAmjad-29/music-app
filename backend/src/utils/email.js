const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
  console.log("Preparing to send email...");
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });
  // console.log("Transport created with host:", process.env.EMAIL_HOST);

  const mailOptions = {
    from: "h.zaidamjad29@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

 
  await transport.sendMail(mailOptions);
  console.log("Email sent!");
};

module.exports = sendEmail;
