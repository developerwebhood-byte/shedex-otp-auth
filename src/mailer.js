const nodemailer = require("nodemailer");

async function sendOtpEmail({ to, otp }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use TLS
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  const subject = "Shedex Verification : Your OTP";
  const text = `Your OTP is: ${otp}\n\nThis OTP is valid for a short time. Do not share it with anyone.`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2 style="margin-bottom: 8px;">Your OTP Code</h2>
      <p>Your OTP is:</p>
      <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px; margin: 12px 0;">
        ${otp}
      </div>
      <p style="color:#555;">This OTP is valid for a short time. Do not share it with anyone.</p>
    </div>
  `;

  const info = await transporter.sendMail({
    from: `"Shedex Auth Service" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html
  });

  return info.messageId;
}

module.exports = { sendOtpEmail };
