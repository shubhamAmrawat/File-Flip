import express from 'express'; 
import { login, logout, register, sendEmailVerificationOtp, verifyEmailOtp } from '../controller/authController.js';
import userAuth from '../middleware/authMiddleware.js';

const authRouter = express.Router(); 

authRouter.post('/signup', register);
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/send-otp', userAuth , sendEmailVerificationOtp)
authRouter.post('/verify-otp', userAuth, verifyEmailOtp)




export default authRouter; 