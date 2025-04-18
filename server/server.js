import express from "express";
import cors from 'cors';
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDb from "./config/mongoDb.js";
import authRouter from "./router/authRoutes.js";
import userRoutes from "./router/userRouter.js";
import fileRouter from "./router/fileRouter.js";


const app = express();
const port = process.env.PORT || 5100;
const allowedOrigins = ['http://localhost:5174','http://192.168.29.69:5174']
connectDb();
//middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:allowedOrigins,
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send("FILE FLIP INITIALL");
})
app.use('/api/auth', authRouter)
app.use('/api/user', userRoutes)
app.use('/api/files',fileRouter)


app.listen(port, () => {
  console.log(`Server started at ${port} url is http://localhost:${port}`);
})
