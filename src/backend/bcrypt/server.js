const { PrismaClient } = require("@prisma/client");
import express from "express";
import bcrypt from "bcryptjs";
import prisma from "./lib/prisma.ts";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Gerar o "salt" com custo 10 ou 12 e depois criar o hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Salvar o usuário no banco usando o Prisma com a senha criptografada
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // Armazena o hash
      },
    });

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso!", userId: newUser.id });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao criar usuário ou e-mail já existe." });
  }
});

// 2. ROTA DE LOGIN (AUTENTICAÇÃO)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar o usuário pelo e-mail no banco
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    // O bcrypt compara a senha digitada com o hash salvo.
    // Ele extrai o salt de dentro do próprio hash do banco para fazer a validação.
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    // Se chegou aqui, a senha está correta
    res.status(200).json({ message: "Login realizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

app.listen(3000, () => console.log("API rodando na porta 3000"));
