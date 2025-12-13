const { sendOtpService } = require("../utilities/otp.service");

exports.sendOtp = async (req, res) => {
  try {
    await sendOtpService(req.body.email);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP SEND ERROR:", error.message);
    return res.status(500).json({ message: "OTP sending failed" });
  }
};
