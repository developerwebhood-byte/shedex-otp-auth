require("dotenv").config();
console.log("GMAIL_USER:", process.env.GMAIL_USER);
console.log("GMAIL_APP_PASSWORD:", process.env.GMAIL_APP_PASSWORD ? "Loaded ✅" : "Not Loaded ❌");
const express = require("express");
const cors = require("cors");

const { generateOTP } = require("./otp");
const { sendOtpEmail } = require("./mailer");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "OK", message: "OTP Email API is running" });
});

/**
 * POST /api/generateotpandsendemail
 * Body: { "email": "user@example.com" }
 */
app.post("/api/generateotpandsendemail", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    // simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    const otp = generateOTP();

    const messageId = await sendOtpEmail({ to: email, otp });

    // ✅ return otp to React
    return res.json({
      success: true,
      message: "OTP sent successfully",
      email,
      otp,
      messageId
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP email",
      error: error.message
    });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
