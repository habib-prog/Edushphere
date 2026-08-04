import jwt from "jsonwebtoken";

export const authMiddleWare = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: no access token",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: invalid token",
    });
  }
};
