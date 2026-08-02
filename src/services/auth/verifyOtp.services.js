import User from "../../models/userSchema.js";
import { getOtpFromRedis, deleteOtpFromRedis } from "../../helpers/Otp/otp.service.js";

export const verifyOtpService = async ({ email, otp }) => {
  const storedOtp = await getOtpFromRedis(email);

  if (!storedOtp) {
    const error = new Error("OTP has expired or does not exist");
    error.statusCode = 400;
    throw error;
  }

  if (storedOtp !== otp) {
    const error = new Error("Invalid OTP");
    error.statusCode = 400;
    throw error;
  }

  await deleteOtpFromRedis(email);

  const user = await User.findOneAndUpdate(
    { email },
    { isVerified: true },
    { new: true }
  ).select("-password");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};
