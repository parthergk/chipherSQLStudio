import cookieParser from "cookie-parser";
import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import assignmentRoute from "./routes/assignments.js";
import queryRoute from "./routes/query.js";
import llmHintRoute from "./routes/hint.js";
import connectTodb from "./db/mongo.js";
import registerRoute from "./routes/auth/register.js";
import loginRoute from "./routes/auth/login.js";
import userMiddleware from "./middleware/userMiddleware.js";
const app = express();
const PORT = 5000;

app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());

async function startServer() {
  try {
    await connectTodb();

    app.get("/api/me", userMiddleware, (req: Request, res: Response) => {
      res.status(200).json({ isAuth: true });
    });

    app.post("/api/auth/logout", (req, res) => {
      res.clearCookie("authToken", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
      });
    });

    app.use("/api/auth/register/", registerRoute);
    app.use("/api/auth/login/", loginRoute);
    app.use("/api/assignments/", assignmentRoute);
    app.use("/api/query/", queryRoute);
    app.use("/api/hint/", llmHintRoute);

    app.listen(PORT, () => {
      console.log(`http server is runing on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB", error);
    process.exit(1);
  }
}

startServer();
