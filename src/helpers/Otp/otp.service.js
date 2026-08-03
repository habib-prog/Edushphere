import redis from "../../config/redis.js";
import generateOTP from "./generateOtp.js";
import { sendOtpEmail } from "../Mail/sendMail.js";

// Generate, store, and send OTP via email
export const sendOtp = async (email) => {
  const otp = generateOTP();

  await saveOtpToStore(email, otp);
  await sendOtpEmail(email, otp);

  return otp;
};

// Save OTP to Redis store
export const saveOtpToStore = async (email, otp, ttl = 300) => {
  await redis.set(`otp:${email}`, otp, "EX", ttl);
};

// Retrieve OTP from Redis store
export const getOtpFromStore = async (email) => {
  return await redis.get(`otp:${email}`);
};

// Delete OTP from Redis store
export const deleteOtpFromStore = async (email) => {
  await redis.del(`otp:${email}`);
};

// Verify OTP (kept for backwards compatibility)
export const verifyOTP = async (email, otp) => {
  const savedOtp = await getOtpFromStore(email);

  if (!savedOtp) {
    return false;
  }

  if (savedOtp !== otp) {
    return false;
  }

  await deleteOtpFromStore(email);

  return true;
};

// Legacy alias for sendOtp
export const createOTP = sendOtp;
