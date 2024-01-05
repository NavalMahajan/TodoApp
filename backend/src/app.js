import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"))
app.use(cookieParser({ limit: "4kb" }));
app.get("/", (req, res) => {
  res.send("Hi welcome to my server");
});
// routes import
import userRouter from "./routes/userRoutes.js";
import todoRouter from "./routes/todoRoute.js";
// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", todoRouter);

export { app };
