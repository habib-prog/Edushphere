import { SignupService } from "../../services/auth/signup.services.js";

export const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const errors = {};

    // Validate request body before calling the service layer. Ghum ashe ken ^_^ ?
    if (!name) {
      errors.name = "Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }
    // Used "keys" property to iterate the object
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    // Service handles database and business logic.
    const user = await SignupService({ name, email, password });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    // Service errors can provide their own status code and message.
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export default signupController;
