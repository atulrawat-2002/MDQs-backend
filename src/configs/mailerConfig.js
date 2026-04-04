import nodemailer from "nodemailer";

console.log("mail user", process.env.EMAIL_USER)
console.log("mail pass", process.env.EMAIL_PASS)

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // use Gmail App Password
  }
});

export default transporter;