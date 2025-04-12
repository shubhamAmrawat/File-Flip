import express from "express";
import cors from 'cors';
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDb from "./config/mongoDb.js";
import authRouter from "./router/authRoutes.js";
import userRoutes from "./router/userRouter.js";

const app = express();
const port = process.env.PORT || 5100;

connectDb();
//middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
}));


app.get('/', (req, res) => {
  res.send("FILE FLIP INITIALL");
})
app.use('/api/auth', authRouter)
app.use('/api/user', userRoutes)



app.listen(port, () => {
  console.log(`Server started at ${port}`);
})
