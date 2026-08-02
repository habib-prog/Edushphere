import nodemailer from "nodemailer";
import { otpTemplate } from "../Mail_Templates/otp_template.js";

/**
 * Transporter setup using SMTP environment variables
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true", // Converts string "false" to boolean false
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: `"Edusphere" <${process.env.MAIL_FROM || process.env.SMTP_USER}>`,
    to,
    subject: "Your Edusphere Verification Code",
    html: otpTemplate(otp),
  };

  await transporter.sendMail(mailOptions);
};
