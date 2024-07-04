import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import userRouter from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";
import dataRouter from "./src/routes/data.routes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

//built in middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "./public");
console.log(publicPath);
app.use(express.static(publicPath));

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routes
app.use("/api/user", userRouter);
app.use("/api/details", dataRouter);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to the Fandom App!</h1>");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
