import express from "express";
import { addStudent } from "../../controllers/admin.controller.js";
import { authMiddleWare } from "../../middlewares/auth.middlware.js";
import { roleCheck } from "../../middlewares/roles.middleware.js";

const router = express.Router();

router.post("/", authMiddleWare, roleCheck("admin"), addStudent);

export default router;
