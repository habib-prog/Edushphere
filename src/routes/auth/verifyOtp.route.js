import express from "express";
import { verifyOtpController } from "../../controllers/auth/verifyOtp.controller.js";

const router = express.Router();

router.post("/", verifyOtpController);

export default router;
