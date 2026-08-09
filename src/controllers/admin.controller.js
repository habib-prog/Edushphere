// Importing service layers
import { createStudentIntoDB } from "../services/admin.services.js";

export const addStudent = async (req, res, next) => {
  try {
    const studentData = req.body;

    if (!studentData.email) {
      return res.status(400).json({
        success: false,
        message: "Email is required to add a student!",
      });
    }

    //   Sending the request to service layer

    const result = await createStudentIntoDB(studentData);
    return res.status(201).json({
      success: true,
      message: "Student added successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
