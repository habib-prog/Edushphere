import redisClient from "../../config/redis.js";

// 1. Redis-e OTP Save  (Expiry: 5 Minutes / 300s)
export const saveOtpToRedis = async (email, otp, ttlInSeconds = 300) => {
  const key = `otp:${email}`;
  await redisClient.setEx(key, ttlInSeconds, otp);
};

// 2. Redis  OTP Fetch
export const getOtpFromRedis = async (email) => {
  const key = `otp:${email}`;
  return await redisClient.get(key);
};

// 3. Verification-er then Redis  OTP Delete
export const deleteOtpFromRedis = async (email) => {
  const key = `otp:${email}`;
  await redisClient.del(key);
};
