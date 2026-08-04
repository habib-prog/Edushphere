import jwt from "jsonwebtoken";
import redis from "../../config/redis.js";
import User from "../../models/userSchema.js";

const createToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw { statusCode: 401, message: "Refresh token missing" };
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw { statusCode: 401, message: "Invalid or expired refresh token" };
  }

  const storedToken = await redis.get(`refresh:${decoded.id}`);
  if (!storedToken || storedToken !== refreshToken) {
    throw { statusCode: 401, message: "Refresh token invalid or reused" };
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw { statusCode: 401, message: "User not found" };
  }
  if (user.isBlocked) {
    throw { statusCode: 403, message: "Your account is blocked" };
  }

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const newAccessToken = createToken(
    payload,
    process.env.JWT_ACCESS_SECRET,
    process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
  );

  const newRefreshToken = createToken(
    payload,
    process.env.JWT_REFRESH_SECRET,
    process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  );

  await redis.set(
    `refresh:${user._id}`,
    newRefreshToken,
    "EX",
    60 * 60 * 24 * 7,
  );

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};
