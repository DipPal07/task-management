import express from "express";
import dotenv from "dotenv";
import cors from "cors";

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

app.get("/", (req, res) => {
  res.send("helloooooo");
});

app.listen(PORT, () => {
  console.log(`server is running at ${process.env.BASE_URL}:${PORT}`);
});
