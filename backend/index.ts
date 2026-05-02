import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import imageRouter from "./routes/image.route";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

connectDB().catch((err) => {
  console.log("DB connection failed:", err);
});

if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;