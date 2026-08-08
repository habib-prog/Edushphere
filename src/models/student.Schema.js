import mongoose from "mongoose";
const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Relation with User model
      required: [true, "User ID is required"],
    },
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
      trim: true,
    },
    name: {
      firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    contactNo: {
      type: String,
      required: [true, "Contact number is required"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    presentAddress: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Student = mongoose.model("student", studentSchema);
export default Student;
