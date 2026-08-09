import express from "express";
import addStudentRoute from "./addStudent.route";
const router = express.Router();

router.use("/add-student", addStudentRoute);

export default router;
