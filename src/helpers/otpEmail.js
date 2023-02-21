const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const sendMail = async (email, otp) => {
  const options = {
    from: "'Kalibrr' <no-reply@gmail.com>",
    to: email,
    subject: "KALIBRR",
    html: ``,
    text: otp,
  };

  transporter.sendMail(options, (err, info) => {
    if (err) return "Gagal, mohon ulangi lagi";
    return "OTP sudah dikirim";
  });
};

module.exports = sendMail;
