import crypto from "crypto";

export const generateOTP = (length = 6) => {
  // Numbers + Uppercase Letters (excluding confusing chars like O, 0, I, 1 if needed, or full set)
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const bytes = crypto.randomBytes(length);
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }

  return result;
};
