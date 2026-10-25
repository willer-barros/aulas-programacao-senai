import { pool } from "./db.js";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import "dotenv/config";

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(cors());

app.use(cookieParser());

app.get("/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM cliente");
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const { rows } = await pool.query(
            "INSERT INTO cliente (email, password) VALUES ($1, $2) RETURNING *", 
            [email, hashedPassword]
        );
        
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erro ao cadastrar usuário (verifique se o e-mail já existe)." });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const result = await pool.query("SELECT * FROM cliente WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const user = result.rows[0];

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }

        // parte de salvar o token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // parte de Injetar o token no Cookie HTTP-only
        res.cookie('token', token, {
            httpOnly: true,                 // Protege contra XSS (JS não lê o cookie)
            secure: false,
            sameSite: 'strict',             // Protege contra CSRF
            maxAge: 60 * 60 * 1000          // 1 hora em milissegundos
        });

        return res.status(200).json({ message: "Login realizado com sucesso!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
});

app.listen(PORT, () => {
  console.log(`API rodando ${PORT}`);
});