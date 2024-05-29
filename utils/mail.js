import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import Otp from "../model/otp.js";

const otp = otpGenerator.generate(4, {
  lowerCaseAlphabets: false,
  specialChars: false,
  upperCaseAlphabets: false,
});
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333333;">Your OTP</h2>
    <p style="color: #666666;">Dear User,</p>
    <p style="color: #666666;">Your One-Time Password (OTP) for verification is:</p>
    <div style="background-color: #ffffff; border: 1px solid #cccccc; border-radius: 4px; padding: 10px;">
      <p style="font-size: 24px; font-weight: bold; color: #007bff; margin: 0;">${otp}</p>
    </div>
    <p style="color: #666666;">Please use this OTP to complete your action.</p>
    <p style="color: #666666;">If you didn't request this OTP, please ignore this email.</p>
    <p style="color: #666666;">Regards,</p>
    <p style="color: #666666;">Your Company Name</p>
  </div>
`;

const sendEmail = (email) => {
  return new Promise((resolve, reject) => { 
    const mailOptions = {
      from: "laishramrohit15@gmail.com",
      to: email,
      subject: "Email Verification",
      html: htmlContent,
    };
    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        console.error(err.message);
        reject(new Error(`Error sending email: ${err.message}`));
      } else {
        await Otp.create({ email, otp });
        console.log(`Email sent: ${info.response}`);
        resolve(info.response);
      }
    });
  });
};

export { sendEmail, otp };
