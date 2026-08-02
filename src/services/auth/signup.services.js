import User from "../../models/userSchema.js";
import { generateOTP } from "../../helpers/Otp/generateOtp.js";
import { saveOtpToRedis } from "../../helpers/Otp/otp.service.js";
import { sendOtpEmail } from "../../helpers/Mail/sendMail.js";

export const SignupService = async ({ name, email, password }) => {
  // Prevent duplicate signup with the same email.
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  // Create user; password hashing is handled by the user schema pre-save hook.
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate OTP and save it to Redis with a 5-minute expiration.
  const otp = generateOTP();
  await saveOtpToRedis(email, otp, 300);

  // Send OTP to the user's email.
  await sendOtpEmail(email, otp);

  const userData = user.toObject();
  delete userData.password;

  return userData;
};
