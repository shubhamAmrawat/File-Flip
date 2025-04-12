import express from 'express';

import userAuth from '../middleware/authMiddleware.js';
import { getUserData } from '../controller/userController.js';



const userRoutes = express.Router();

userRoutes.get('/getUsersData', userAuth, getUserData)

export default userRoutes; 