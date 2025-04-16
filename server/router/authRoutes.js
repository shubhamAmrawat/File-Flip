import express from 'express'; 
import { isAuthenticated, login, logout, register, sendEmailVerificationOtp, sendResetOtp, verifyEmailOtp, verifyResetOtp } from '../controller/authController.js';
import userAuth from '../middleware/authMiddleware.js';

const authRouter = express.Router(); 

authRouter.post('/signup', register);
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/send-otp', userAuth , sendEmailVerificationOtp)
authRouter.post('/verify-otp', userAuth, verifyEmailOtp)

authRouter.get('/is-auth', userAuth, isAuthenticated);

authRouter.post('/sendResetOtp', sendResetOtp);
authRouter.post('/verifyResetOtp', verifyResetOtp);


export default authRouter; 