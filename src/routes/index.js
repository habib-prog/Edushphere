import express from "express";
import authRoutes from "./auth/index.js";
import postRoutes from "./post.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use(["/posts", "/post"], postRoutes);

export default router;
