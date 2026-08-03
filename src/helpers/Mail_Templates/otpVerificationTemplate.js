export const otpTemplate = (otp) => {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 0; background: #f7f5f0; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.08);">
      <div style="background: linear-gradient(90deg, #c62828 0%, #2e7d32 100%); padding: 24px 28px; text-align: center; color: #ffffff;">
        <div style="display: inline-block; padding: 10px 16px; border: 1px solid rgba(255,255,255,0.3); border-radius: 999px; margin-bottom: 10px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; background: rgba(255,255,255,0.15);">
          EDUSPHERE Learning Portal
        </div>
        <h1 style="margin: 0; font-size: 30px; font-weight: 700;">Welcome to Your Learning Journey</h1>
        <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.95;">Learn. Grow. Lead.</p>
      </div>

      <div style="padding: 30px 28px 32px; background: #ffffff;">
        <h2 style="margin: 0 0 12px; color: #1f2937; font-size: 24px; text-align: center;">Verify Your Account</h2>
        <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.7; color: #4b5563; text-align: center;">
          Thank you for joining EDUSPHERE. Use the secure verification code below to complete your signup and unlock your academic portal.
        </p>

        <div style="background: #fff7f2; border: 1px dashed #c62828; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
          <p style="margin: 0 0 8px; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #c62828;">Your One-Time Code</p>
          <div style="font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #2e7d32;">${otp}</div>
        </div>

        <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280; text-align: center;">
          This code will expire in <strong>5 minutes</strong>.
        </p>
        <p style="margin: 0; font-size: 14px; color: #6b7280; text-align: center;">
          If you did not request this code, you can safely ignore this email.
        </p>
      </div>

      <div style="background: #f3f7f1; padding: 16px 28px 24px; text-align: center; color: #4b5563; font-size: 13px;">
        Knowledge is the key to tomorrow.
      </div>
    </div>
  `;
};
