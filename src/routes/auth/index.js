import express from "express";
import loginRoutes from "./login.route.js";
import signupRoutes from "./signup.route.js";
import verifyOtpRoutes from "./verifyOtp.route.js";
import refreshRoutes from "./refresh.route.js";

const router = express.Router();

router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);
router.use("/verify-otp", verifyOtpRoutes);
router.use("/refresh", refreshRoutes);

export default router;
