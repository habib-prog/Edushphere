export const verificationSuccessTemplate = (name = "there") => {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 0; background: #f7f5f0; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.08);">
      <div style="background: linear-gradient(90deg, #c62828 0%, #2e7d32 100%); padding: 24px 28px; text-align: center; color: #ffffff;">
        <div style="display: inline-block; padding: 10px 16px; border: 1px solid rgba(255,255,255,0.3); border-radius: 999px; margin-bottom: 10px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; background: rgba(255,255,255,0.15);">
          EDUSPHERE Success
        </div>
        <h1 style="margin: 0; font-size: 30px; font-weight: 700;">Your Account Is Ready</h1>
        <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.95;">Grow with knowledge. Lead with confidence.</p>
      </div>

      <div style="padding: 30px 28px 32px; background: #ffffff;">
        <h2 style="margin: 0 0 12px; color: #1f2937; font-size: 24px; text-align: center;">Verification Successful</h2>
        <p style="margin: 0 0 14px; font-size: 16px; line-height: 1.7; color: #4b5563; text-align: center;">
          Hello <strong>${name}</strong>, your EDUSPHERE account has been verified successfully.
        </p>
        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.7; color: #4b5563; text-align: center;">
          You can now sign in and continue your journey with a trusted education portal built for learners and educators.
        </p>

        <div style="background: #f2fbf3; border-left: 4px solid #2e7d32; border-radius: 10px; padding: 16px 18px; margin: 20px 0 0;">
          <p style="margin: 0; color: #2e7d32; font-weight: 700;">Welcome aboard to EDUSPHERE — where learning meets opportunity.</p>
        </div>
      </div>

      <div style="background: #f3f7f1; padding: 16px 28px 24px; text-align: center; color: #4b5563; font-size: 13px;">
        Education is the passport to the future.
      </div>
    </div>
  `;
};
