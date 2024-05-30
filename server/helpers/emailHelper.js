// helpers/emailHelper.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const sendOtpEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or another email service
      auth: {
        // user: process.env.EMAIL, // Your email address
        // pass: process.env.EMAIL_PASSWORD, // Your email password
        user: 'abdjav2002@gmail.com',
          pass: 'julz hrkl vvpr apiu'
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`.bgGreen.white);
  } catch (error) {
    console.error(`Error sending OTP email: ${error}`.bgRed.white);
    throw error;
  }
};
