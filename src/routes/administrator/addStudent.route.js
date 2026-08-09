import express from "express";
import { addStudent } from "../../controllers/admin.controller";
import { authMiddleWare } from "../../middlewares/auth.middlware";
import { roleCheck } from "../../middlewares/roles.middleware";

const router = express.Router();

router.post("/", authMiddleWare, roleCheck("admin"), addStudent);

export default router;
