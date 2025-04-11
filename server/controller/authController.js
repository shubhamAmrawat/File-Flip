import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import transporter from "../config/nodemailer.js";
import { text } from "express";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.json({ success: false, message: `Missing details` });

    const existingUser = await userModel.findOne({ email });

    if (existingUser) return res.json({ success: false, message: `User already exist Login instead` });

    const hashedPass = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPass
    })

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === 'PRODUCTION',
      sameSite: process.env.ENVIRONMENT === 'PRODUCTION' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    const emailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to File-Flip",
      html: `
  <div style="font-family: 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9fb; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <div style="text-align: center;">
      <img src="https://drive.google.com/file/d/1amUTrozrcJ-63f-ZS07biMSDFaYv77sl/view?usp=sharing" alt="File-Flip Logo" style="width: 80px; height: auto; margin-bottom: 20px;" />
    </div>
    <h2 style="color: #333; text-align: center;">Welcome to <span style="color: #6366f1;">File-Flip</span> 👋</h2>
    <p style="color: #555; font-size: 16px; line-height: 1.6;">
      Hey there,
    </p>
    <p style="color: #555; font-size: 16px; line-height: 1.6;">
      We're thrilled to have you on board! 🎉 File-Flip makes converting and managing your files incredibly simple and fast. Whether you're flipping a PDF to Word, extracting audio, or processing video — we’ve got you covered.
    </p>
    <p style="color: #555; font-size: 16px; line-height: 1.6;">
      Here's what you can do:
    </p>
    <ul style="color: #444; font-size: 16px; line-height: 1.6; padding-left: 20px;">
      <li>🔁 Convert between PDF, Word, PPT, Excel</li>
      <li>🎧 Extract audio from videos or YouTube links</li>
      <li>⚡ Work seamlessly, without the clutter</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="#" style="display: inline-block; background-color: #6366f1; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">
        Get Started
      </a>
    </div>
    <p style="font-size: 14px; color: #888; text-align: center;">
      Need help? Just reply to this email or visit our <a href="https://file-flip.app/support" style="color: #6366f1;">Support Center</a>.
    </p>
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
    <p style="font-size: 12px; color: #aaa; text-align: center;">
      © ${new Date().getFullYear()} File-Flip. All rights reserved.
    </p>
  </div>
  `,
    };

    await transporter.sendMail(emailOption);


    return res.json({ success: true, message: `Signup Successful` })
  } catch (error) {
    return res.json({ success: false, message: `Error in register controller : ${error.message}` })
  }

}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.json({ success: false, message: `Missing credentials` });

    const user = await userModel.findOne({ email });

    if (!user) return res.json({ success: false, message: `Account not Found` });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.json({ success: false, message: `Invalid  credentials` });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === 'PRODUCTION',
      sameSite: process.env.ENVIRONMENT === 'PRODUCTION' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.json({ success: true, message: "Login Successful" });

  } catch (error) {
    return res.json({ success: false, message: `Error in login controller ${error.message}` })
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === 'PRODUCTION',
    })
    return res.json({ success: true, message: "Logged out Successfully" });

  } catch (error) {
    return res.json({ success: false, message: `Error in Logout controller ${error.message}` });
  }
}

export const sendEmailVerificationOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (user.isAccountVerified) return res.json({ success: false, message: `Account already verified` });

    const otp = String(Math.floor(100000 + Math.random() * 900000))
    user.verifyOtp = otp;
    user.verifyOtpExpiryTime = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "🔐 Your OTP for Verification",
      text: `Hello ${user.name}, here is your OTP: ${otp}`,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px; background-color: #ffffff;">
      <div style="text-align: center;">
        <h2 style="color: #3f51b5;">Your One-Time Password (OTP)</h2>
      </div>
      <p style="font-size: 16px; color: #333;">Hello <strong>${user.name}</strong>,</p>
      <p style="font-size: 16px; color: #333;">
        Please use the following OTP to complete your verification process:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="display: inline-block; font-size: 24px; font-weight: bold; background-color: #f0f4ff; color: #3f51b5; padding: 12px 24px; border-radius: 8px; letter-spacing: 2px;">
          ${otp}
        </span>
      </div>
      <p style="font-size: 14px; color: #777;">This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
      <p style="font-size: 14px; color: #777;">If you did not request this OTP, please ignore this email or contact support.</p>
      <p style="font-size: 14px; color: #777;">Thank you, <br/>The Team</p>
    </div>
  `
    };

    await transporter.sendMail(mailOption);

    return res.json({ success: true, message: "Verification otp send on the Email" });


  } catch (error) {
    return res.json({ success: false, message: `Error in sendverification controller: ${error.message}` });
  }
}

export const verifyEmailOtp = async (req, res) => {
  try {

    const { userId, otp } = req.body;

    if (!userId || !otp) return res.json({ success: false, message: `Missing Details` });

    const user = await userModel.findById(userId);

    if (!user) return res.json({ success: false, message: `User missing` });

    if (user.verifyOtp === '' || user.verifyOtp !== otp) {
      return res.json({ success: false, message: `Invalid OTP ` });
    }

    if (user.verifyOtpExpiryTime < Date.now) {
      return res.json({ success: false, message: `Expired OTP ` });
    }

    user.isAccountVerified = true;
    user.verifyOtp = '',
    user.verifyOtpExpiryTime = 0;
    
    await user.save(); 
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "✅ Email Verified Successfully",
      text: `Hello ${user.name}, your email account has been verified successfully.`,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px; background-color: #ffffff;">
      <div style="text-align: center;">
        <h2 style="color: #4CAF50;">Email Verified Successfully!</h2>
      </div>
      <p style="font-size: 16px; color: #333;">Hello <strong>${user.name}</strong>,</p>
      <p style="font-size: 16px; color: #333;">
        We are happy to inform you that your email account has been <strong style="color: #4CAF50;">successfully verified</strong>. You can now enjoy all the features of our service without any interruption.
      </p>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
      <p style="font-size: 14px; color: #777;">If you did not request this verification, please contact our support team immediately.</p>
      <p style="font-size: 14px; color: #777;">Thank you, <br/>The Team</p>
    </div>
  `
    };


    await transporter.sendMail(mailOption); 

    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: `Error in  verifyEmailOtp Controller: ${error.message}` });
  }
}