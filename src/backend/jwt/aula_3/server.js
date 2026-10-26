import { pool } from "./db.js";
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs"

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors())

app.get("/", async (req, res) =>{
    const oi = await res.json({message: "oi"})
})

app.post("/register", async(req, res) =>{
    const {email, password} = req.body;
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const {rows} = await pool.query("INSERT INTO clientes(email, password) values ($1, $2) RETURNING *", [email, hashedPassword]);
    return res.json(rows)
})
app.listen(PORT, ()=>{
    console.log("to rodando!!!")
})