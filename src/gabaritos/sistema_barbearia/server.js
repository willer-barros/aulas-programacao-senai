import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const JWT_SECRET = "segredo_barber_control_2026";

app.use(
  cors({
    origin: "http://localhost:5173", // Porta padrão do Vite/React
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Middleware de Autenticação via Cookie HttpOnly
function autenticar(req, res, next) {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ mensagem: "Acesso não autorizado. Faça login." });

  try {
    const usuario = jwt.verify(token, JWT_SECRET);
    req.usuario = usuario;
    next();
  } catch (err) {
    return res.status(403).json({ mensagem: "Sessão expirada ou inválida." });
  }
}

// 1. ROTA DE LOGIN
app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
      },
      JWT_SECRET,
      { expiresIn: "2h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7200000, // 2 horas
    });

    return res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      cargo: usuario.cargo,
    });
  } catch (err) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
});

// 2. LOGOUT
app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ mensagem: "Sessão encerrada." });
});

// 3. MEU PERFIL (VERIFICAR SESSÃO)
app.get("/api/me", autenticar, (req, res) => {
  return res.json(req.usuario);
});

// 4. CLIENTES (LISTAGEM + COM BUSCA POR NOME)
app.get("/api/clientes", autenticar, async (req, res) => {
  const { busca } = req.query;
  try {
    const clientes = await prisma.cliente.findMany({
      where: busca
        ? {
            nome: { contains: busca, mode: "insensitive" },
          }
        : {},
    });
    return res.json(clientes);
  } catch (err) {
    return res.status(500).json({ mensagem: "Erro ao listar clientes." });
  }
});

// 5. CADASTRAR CLIENTE (LGPD: CPF CRIPTOGRAFADO)
app.post("/api/clientes", autenticar, async (req, res) => {
  const { nome, telefone, cpf } = req.body;

  try {
    const cpfCriptografado = await bcrypt.hash(cpf, 10);
    const novoCliente = await prisma.cliente.create({
      data: { nome, telefone, cpf: cpfCriptografado },
    });
    return res.status(201).json(novoCliente);
  } catch (err) {
    return res
      .status(500)
      .json({
        mensagem: "Erro ao cadastrar cliente. Verifique se o CPF já existe.",
      });
  }
});

// 6. LISTAR BARBEIROS
app.get("/api/barbeiros", autenticar, async (req, res) => {
  try {
    const barbeiros = await prisma.barbeiro.findMany();
    return res.json(barbeiros);
  } catch (err) {
    return res.status(500).json({ mensagem: "Erro ao listar barbeiros." });
  }
});

// 7. CADASTRAR BARBEIRO
app.post("/api/barbeiros", autenticar, async (req, res) => {
  const { nome, especialidade } = req.body;
  try {
    const novo = await prisma.barbeiro.create({
      data: { nome, especialidade },
    });
    return res.status(201).json(novo);
  } catch (err) {
    return res.status(500).json({ mensagem: "Erro ao cadastrar barbeiro." });
  }
});

// 8. CADASTRAR SERVIÇO (VÍNCULO OBRIGATÓRIO COM BARBEIRO)
app.post("/api/servicos", autenticar, async (req, res) => {
  const { nome, preco, barbeiroId } = req.body;
  try {
    const novoServico = await prisma.servico.create({
      data: {
        nome,
        preco: parseFloat(preco),
        barbeiroId: Number(barbeiroId),
      },
    });
    return res.status(201).json(novoServico);
  } catch (err) {
    return res.status(500).json({ mensagem: "Erro ao cadastrar serviço." });
  }
});

// 9. LISTAR SERVIÇOS
app.get("/api/servicos", autenticar, async (req, res) => {
  try {
    const servicos = await prisma.servico.findMany({
      include: { barbeiro: true },
    });
    return res.json(servicos);
  } catch (err) {
    return res.status(500).json({ mensagem: "Erro ao buscar serviços." });
  }
});

// 10. CADASTRAR AGENDAMENTO
app.post("/api/agendamentos", autenticar, async (req, res) => {
  const { dataHorario, clienteId, servicoId } = req.body;
  try {
    const novoAgendamento = await prisma.agendamento.create({
      data: {
        dataHorario: new Date(dataHorario),
        clienteId: Number(clienteId),
        servicoId: Number(servicoId),
      },
    });
    return res.status(201).json(novoAgendamento);
  } catch (err) {
    return res.status(500).json({ mensagem: "Erro ao agendar horário." });
  }
});

// 11. AGENDAMENTOS (ORDENADOS POR DIA E HORÁRIO COM TODAS AS RELAÇÕES)
app.get("/api/agendamentos", autenticar, async (req, res) => {
  try {
    const agendamentos = await prisma.agendamento.findMany({
      orderBy: { dataHorario: "asc" },
      include: {
        cliente: true,
        servico: {
          include: { barbeiro: true },
        },
      },
    });
    return res.json(agendamentos);
  } catch (err) {
    return res.status(500).json({ mensagem: "Erro ao buscar agendamentos." });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor BarberControl rodando em http://localhost:${PORT}`),
);
