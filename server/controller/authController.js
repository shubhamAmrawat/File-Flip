import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import transporter from "../config/nodemailer.js";

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