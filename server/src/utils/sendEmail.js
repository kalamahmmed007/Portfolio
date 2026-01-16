import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Site" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    });
    console.log("✅ Email sent: %s", info.messageId);
  } catch (error) {
    console.error("❌ Email send error:", error);
  }
};
