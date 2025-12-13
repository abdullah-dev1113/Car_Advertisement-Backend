const OTP = require("../Models/otp.model");
const nodemailer = require("nodemailer");

async function sendOtpService(email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await OTP.findOneAndUpdate(
    { email },
    { otp, createdAt: new Date() },
    { upsert: true, new: true }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`
  });

  return true;
}

module.exports = { sendOtpService };
