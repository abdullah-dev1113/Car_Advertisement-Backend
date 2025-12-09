const Otp = require("../Models/otp.model");
const User = require("../Models/Users.model");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// =============================
// 📌 Email Transporter
// =============================
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// =============================
// 📌 SEND OTP
// =============================
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    // Purane OTP delete
    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp: hashedOtp,
      createdAt: Date.now(),
    });

    // Email send
    await transporter.sendMail({
      from: `"Car_Advertisement Email Verification" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Your Verification Code</h2>
        <p>Your OTP is <b>${otp}</b></p>
        <p>It will expire in <b>5 minutes</b>.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("OTP SEND ERROR:", error.message);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

// =============================
// 📌 VERIFY OTP (Backend)
// =============================
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email & OTP are required" });
    }

    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord)
      return res.status(400).json({ message: "OTP expired or not found" });

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    if (hashedOtp !== otpRecord.otp)
      return res.status(400).json({ message: "Incorrect OTP" });

    // Mark user verified
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    // Delete OTP after success
    await Otp.deleteMany({ email });

    // Generate login token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user,
    });
  } catch (error) {
    console.log("VERIFY OTP ERROR:", error);
    res.status(500).json({ message: "OTP verification failed" });
  }
};
