import jwt from "jsonwebtoken";
import redis from "../../config/redis.js";
import User from "../../models/userSchema.js";

const createToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  if (user.isBlocked) {
    const error = new Error("Your account is blocked");
    error.statusCode = 403;
    throw error;
  }

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    payload,
    process.env.JWT_ACCESS_SECRET,
    process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
  );

  const refreshToken = createToken(
    payload,
    process.env.JWT_REFRESH_SECRET,
    process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  );

  await redis.set(`refresh:${user._id}`, refreshToken, "EX", 60 * 60 * 24 * 7);

  const userData = user.toObject();
  delete userData.password;

  return {
    user: userData,
    accessToken,
    refreshToken,
  };
};

export default loginService;
