import express from "express";
import authRoutes from "./auth/index.js";
import postRoutes from "./post/index.js";
import adminRoute from "./administrator/index.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use(["/posts", "/post"], postRoutes);
router.use("/students", adminRoute);

export default router;
