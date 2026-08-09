import express from "express";
import addStudentRoute from "./addStudent.route.js";
const router = express.Router();

router.use("/add-students", addStudentRoute);

export default router;
