import { signupValidationSchema } from "../../helpers/validator/auth.validator.js";
import { SignupService } from "../../services/auth/signup.services.js";

export const signupController = async (req, res) => {
  try {
    const validationResult = signupValidationSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      });
    }

    const { name, email, password } = validationResult.data;

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
