import { loginValidationSchema } from "../../helpers/validator/auth.validator.js";
import { loginService } from "../../services/auth/login.services.js";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../helpers/utils/cookie.Options.js";

export const loginController = async (req, res) => {
  try {
    const validationResult = loginValidationSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      });
    }

    const { email, password } = validationResult.data;

    const { user, accessToken, refreshToken } = await loginService({
      email,
      password,
    });

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user },
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export default loginController;
