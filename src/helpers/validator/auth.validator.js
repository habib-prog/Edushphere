import { z } from "zod";

export const signupValidationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address format" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});
