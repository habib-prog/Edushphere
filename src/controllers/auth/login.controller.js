import { loginValidationSchema } from "../../helpers/validator/auth.validator.js";

export const loginController = (req, res) => {
  try {
    const validationResult = loginValidationSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      });
    }

    const { email } = validationResult.data;

    return res.status(200).json({
      success: true,
      message: "Login validation passed",
      data: { email },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default loginController;
