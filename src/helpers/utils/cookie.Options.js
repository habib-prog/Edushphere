export const accessTokenCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // production  https
  sameSite: "strict",
  maxAge: 15 * 60 * 1000, // 15 minutes
};

export const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
