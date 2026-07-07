import User from "../../models/userSchema.js";

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

  const userData = user.toObject();
  delete userData.password;

  return userData;
};
