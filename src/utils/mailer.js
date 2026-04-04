import transporter from "../configs/mailerConfig.js";

export async function sendRequestEmail({ subject, body }) {
  console.log(process.env.ADMIN_EMAIL, "admin email")
  console.log(process.env.EMAIL_USER, "email user")
  console.log("Sending mail", subject, body)
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject,
      html: body,
    });
    console.log("Email sent:", subject);
  } catch (err) {
    console.error("Email failed:", err.message);
  }
}

