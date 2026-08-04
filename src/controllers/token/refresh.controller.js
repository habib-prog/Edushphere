import { refreshTokenService } from "../../services/token/refresh.services.js";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../helpers/utils/cookie.Options.js";

export const refreshController = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    const { accessToken, refreshToken: newRefreshToken } =
      await refreshTokenService(refreshToken);

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", newRefreshToken, refreshTokenCookieOptions);

    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export default refreshController;
