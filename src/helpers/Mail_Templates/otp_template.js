export const otpTemplate = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #4F46E5; text-align: center;">Welcome to Edusphere!</h2>
      <p style="font-size: 16px; color: #333;">Thank you for registering. Please use the following verification code to complete your signup:</p>
      <div style="background-color: #f4f4f5; padding: 15px; text-align: center; border-radius: 6px; margin: 20px 0;">
        <span style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #111827;">${otp}</span>
      </div>
      <p style="font-size: 14px; color: #6b7280;">This verification code will expire in <strong>5 minutes</strong>.</p>
    </div>
  `;
};
