import { verifyOtpValidationSchema } from "../../helpers/validator/auth.validator.js";
import { verifyOtpService } from "../../services/auth/verifyOtp.services.js";

export const verifyOtpController = async (req, res) => {
  try {
    const validationResult = verifyOtpValidationSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      });
    }

    const { email, otp } = validationResult.data;

    const user = await verifyOtpService({ email, otp });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export default verifyOtpController;
