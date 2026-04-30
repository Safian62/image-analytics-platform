import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())


app.use('/api/v2/user', userRouter)

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
connectDB()