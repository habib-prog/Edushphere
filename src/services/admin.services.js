import Student from "../models/student.Schema.js";
import User from "../models/userSchema.js";
// Imported two of the models

// 1- Adding student to database

export const createStudentIntoDB = async (payload) => {
  const { email, ...studentData } = payload;
  const existingUser = await User.findOne({ email });
  let userId;

  if (existingUser) {
    userId = existingUser._id;
  } else {
    // If no existing user found from the email then it will be an on the fly : user will add by admin
    let userName = "";
    if (typeof studentData.name === "object" && studentData.name !== null) {
      userName = `${studentData.name.firstName || ""} ${studentData.name.lastName || ""}`.trim();
    } else if (typeof studentData.name === "string") {
      userName = studentData.name;
    }

    const newUser = await User.create({
      name: userName || email.split("@")[0],
      email,
      password: "defaultPassword123", // Default Pass set by admin and auto hashed in DB
      role: "student",
    });
    userId = newUser._id;
  }

  const newStudent = await Student.create({
    ...studentData,
    user: userId,
  });

  return newStudent;
};
