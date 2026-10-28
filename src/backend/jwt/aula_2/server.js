import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "./db.js";

const app = express();
const JWT_SECRET = "sua_chave_secreta_super_segura";

// Configuração do CORS obrigatória para aceitar Cookies do Frontend
app.use(
  cors({
    //    origin: "http://localhost:5173",
    credentials: true, // Permite a passagem de cookies entre Front e Back
  }),
);

app.use(express.json());
app.use(cookieParser()); // Necessário para ler req.cookies

function autenticarToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ mensagem: "Acesso negado. Faça login." });
  }

  try {
    const usuario = jwt.verify(token, JWT_SECRET);
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(403).json({ mensagem: "Token inválido ou expirado." });
  }
}

app.post("/cadastrar", async (req, res) => {
  const { email, senha, cpf } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const cpfHash = await bcrypt.hash(cpf, 10);

    const query =
      "INSERT INTO cliente (email, senha, cpf) VALUES ($1, $2, $3) RETURNING id, email";
    const values = [email, senhaHash, cpfHash];

    const resultado = await db.query(query, values);

    return res.status(201).json({
      mensagem: "Cliente cadastrado com sucesso!",
      cliente: resultado.rows[0],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro ao cadastrar cliente.", erro: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const query = "SELECT * FROM cliente WHERE email = $1";
    const resultado = await db.query(query, [email]);
    const cliente = resultado.rows[0];

    if (!cliente) {
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    const senhaValida = await bcrypt.compare(senha, cliente.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    // Gera o Token JWT contendo apenas dados não sensíveis
    const token = jwt.sign(
      { id: cliente.id, email: cliente.email },
      JWT_SECRET,
      { expiresIn: "1h" },
    );

    // ENVIANDO O TOKEN VIA COOKIE SEGURA (HTTP-Only)
    res.cookie("token", token, {
      httpOnly: true, // O código JavaScript do front NÃO consegue ler o cookie (proteção XSS)
      secure: false, // Mude para true em produção (HTTPS)
      sameSite: "lax", // Proteção contra CSRF
      maxAge: 3600000, // Expira em 1 hora (em ms)
    });

    return res.json({
      mensagem: "Login realizado com sucesso!",
      cliente: { id: cliente.id, email: cliente.email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro no servidor.", erro: error.message });
  }
});

// ==========================================
// ROTA 3: Rota Protegida (Perfil do Cliente)
// ==========================================
app.get("/perfil", autenticarToken, async (req, res) => {
  try {
    // Busca dados do cliente usando o ID extraído do Token no middleware
    const query = "SELECT id, email FROM cliente WHERE id = $1";
    const resultado = await db.query(query, [req.usuario.id]);

    return res.json({
      mensagem: "Dados acessados com sucesso via Cookie!",
      cliente: resultado.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao buscar perfil." });
  }
});

// ==========================================
// ROTA 4: Logout (Limpeza do Cookie)
// ==========================================
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ mensagem: "Logout realizado com sucesso!" });
});

app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});
