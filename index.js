import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDB from "./src/db/connectMongoDB.js";
import { ApiError } from "./src/utils/api-error.js";

dotenv.config({
  path: "./.env",
});

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(
  cors({
    origin: ["http://localhost"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at ${process.env.BASE_URL}:${PORT}`);
  });
});

app.get("/", (req, res) => {
  // res.json(new ApiError(200, "hkjhdkjfkj"));
  // res.json(req.url);
  // res.redirect("http://dipkumarpal.me");
  res.download("./src/models/note.models.js");
});
