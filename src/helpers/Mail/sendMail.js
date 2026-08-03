import nodemailer from "nodemailer";
import { otpTemplate } from "../Mail_Templates/otpVerificationTemplate.js";
import { verificationSuccessTemplate } from "../Mail_Templates/verificationSuccessTemplate.js";

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendOtpEmail = async (to, otp) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"EDUSPHERE" <${process.env.MAIL_FROM || process.env.SMTP_USER}>`,
    to,
    subject: "Your EDUSPHERE Verification Code",
    html: otpTemplate(otp),
  };

  await transporter.sendMail(mailOptions);
};

export const sendVerificationSuccessEmail = async (to, name) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"EDUSPHERE" <${process.env.MAIL_FROM || process.env.SMTP_USER}>`,
    to,
    subject: "Your EDUSPHERE Account Has Been Verified",
    html: verificationSuccessTemplate(name),
  };

  await transporter.sendMail(mailOptions);
};
