const nodemailer = require("nodemailer");

async function sendOtpEmail({ to, otp }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // TLS will be upgraded
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 15000, // 15 sec
    greetingTimeout: 15000,
    socketTimeout: 15000
  });

  const info = await transporter.sendMail({
    from: `"Shedex Auth Service" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Shedex Verification : Your OTP",
    text: `Your OTP is: ${otp}`
  });

  return info.messageId;
}

module.exports = { sendOtpEmail };
