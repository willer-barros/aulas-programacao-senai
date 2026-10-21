import Fastify from "fastify";
import cors from "@fastify/cors";
import bcrypt from "bcryptjs";

const app = Fastify();
app.register(cors, { origin: "*" });

// Simulação de Banco de Dados em Memória baseado no SQL
let usuarios = [
  {
    id: 1,
    nome: "Admin",
    email: "admin@task.com",
    senhaHash: "$2a$10$wE/x3D2vFv5C6z7A8B9C0e1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6",
    cpf: "123.456.789-00",
  },
];

let colaboradores = [
  {
    id: 1,
    nome: "Ana Costa",
    email: "ana@empresa.com",
    cargo: "Desenvolvedora",
  },
  { id: 2, nome: "Bruno Rocha", email: "bruno@empresa.com", cargo: "Designer" },
  { id: 3, nome: "Carla Souza", email: "carla@empresa.com", cargo: "Gerente" },
];

let tarefas = [
  {
    id: 1,
    titulo: "Criar Layout",
    descricao: "Mockup no Figma",
    colaboradorId: 2,
  },
  {
    id: 2,
    titulo: "Desenvolver API",
    descricao: "Endpoints Node.js",
    colaboradorId: 1,
  },
];

let agendamentos = [
  { id: 1, tarefaId: 1, dataEntrega: "2026-11-01", status: "Pendente" },
  { id: 2, tarefaId: 2, dataEntrega: "2026-11-05", status: "Em Andamento" },
];

// ROTA 1: Login com validação
app.post("/login", async (request, reply) => {
  const { email, senha } = request.body;
  const usuario = usuarios.find((u) => u.email === email);

  if (!usuario || senha !== "123456") {
    // Validação direta para teste
    return reply.status(401).send({ mensagem: "Credenciais inválidas!" });
  }

  return reply.send({
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    token: "token-fake-123",
  });
});

// ROTA 2: Listar / Buscar Colaboradores
app.get("/colaboradores", async (request, reply) => {
  const { busca } = request.query;
  if (busca) {
    const filtrados = colaboradores.filter((c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()),
    );
    return reply.send(filtrados);
  }
  return reply.send(colaboradores);
});

// ROTA 3: Cadastrar Colaborador
app.post("/colaboradores", async (request, reply) => {
  const { nome, email, cargo } = request.body;
  const novo = { id: colaboradores.length + 1, nome, email, cargo };
  colaboradores.push(novo);
  return reply.status(201).send(novo);
});

// ROTA 4: Cadastrar Tarefa (Vinculada a Colaborador)
app.post("/tarefas", async (request, reply) => {
  const { titulo, descricao, colaboradorId } = request.body;
  const nova = {
    id: tarefas.length + 1,
    titulo,
    descricao,
    colaboradorId: Number(colaboradorId),
  };
  tarefas.push(nova);
  return reply.status(201).send(nova);
});

// ROTA 5: Listar Agendamentos Ordenados por Data
app.get("/agendamentos", async (request, reply) => {
  const resultado = agendamentos.map((a) => {
    const tarefa = tarefas.find((t) => t.id === a.tarefaId);
    const colaborador = (colaborador = colaboradores.find(
      (c) => c.id === tarefa?.colaboradorId,
    ));
    return { ...a, tarefa, colaborador };
  });

  resultado.sort((a, b) => new Date(a.dataEntrega) - new Date(b.dataEntrega));
  return reply.send(resultado);
});

app.listen({ port: 3000 }, () =>
  console.log("🚀 Backend rodando na porta 3000"),
);
