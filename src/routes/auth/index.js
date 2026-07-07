import express from "express";
import loginRoutes from "./login.route.js";
import signupRoutes from "./signup.route.js";

const router = express.Router();

router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);

export default router;
