import express from "express";
import { signupController } from "../../controllers/auth/signup.controller.js";

const router = express.Router();

router.post("/", signupController);

export default router;
