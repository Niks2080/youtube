import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// app.use(express.json({ limit: "16mb" }));
// app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.router.js";
import videoRoute from "./routes/video.router.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/video", videoRoute);

// http://localhost:8000/api/v1/users/register

export { app };
