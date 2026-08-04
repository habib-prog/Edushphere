import express from "express";
import { refreshController } from "../../controllers/token/refresh.controller.js";

const router = express.Router();

router.post("/", refreshController);

export default router;
