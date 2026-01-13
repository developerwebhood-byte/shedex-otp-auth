const { Resend } = require("resend");

async function sendOtpEmail({ to, otp }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY in environment variables");
  }

  const resend = new Resend(RESEND_API_KEY);

  const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

  const subject = "Shedex OTP Verification";
  const text = `Your OTP is: ${otp}\n\nDo not share it with anyone.`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2 style="margin-bottom: 8px;">Your OTP Code</h2>
      <p>Your OTP is:</p>
      <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px; margin: 12px 0;">
        ${otp}
      </div>
      <p style="color:#555;">Do not share it with anyone.</p>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: `OTP Service <${fromEmail}>`,
    to: [to],
    subject,
    text,
    html
  });

  if (error) {
    throw new Error(error.message || "Resend email failed");
  }

  return data?.id || "sent";
}

module.exports = { sendOtpEmail };
