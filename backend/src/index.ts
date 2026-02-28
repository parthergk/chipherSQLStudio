import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import assignmentRouter from "./routes/assignments.js";
import queryRouter from "./routes/query.js";
import llmHintRouter from "./routes/hint.js";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.use("/api/assignemts/", assignmentRouter);
app.use("/api/query/", queryRouter);
app.use("/api/hint/", llmHintRouter);

app.listen(PORT, () => {
  console.log(`http server is runing on port: ${PORT}`);
});
