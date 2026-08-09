import express from "express";
import postRoute from "./post.route";
const router = express.Router();

router.use("/", postRoute);

export default router;
