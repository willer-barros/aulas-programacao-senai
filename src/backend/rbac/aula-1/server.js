import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";
import cookieParser from "cookie-parser";

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
  }),
);

app.use(cookieParser());

app.get("/", async () => {
  res.json({ message: "Funcionando" });
});

app.listen(PORT, () => {
  console.log("API rodando");
});
