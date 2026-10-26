import { pool } from "./db.js";
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors())

app.get("/", async (req, res) =>{
    const oi = await res.json({message: "oi"})
})

app.listen(PORT, ()=>{
    console.log("to rodando!!!")
})