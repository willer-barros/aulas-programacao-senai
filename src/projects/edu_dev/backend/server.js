const PORT = 3002;

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let cursos = [
  { id: 1, titulo: "React Básico", vagas: 20, categoria: "Frontend" },
  { id: 2, titulo: "Node.js", vagas: 15, categoria: "Backend" },
  { id: 3, titulo: "Banco de Dados", vagas: 10, categoria: "Banco de Dados" },
];

// GET - listar cursos
app.get("/cursos", (_req, res) => {
  res.json(cursos);
});

// POST - cadastrar curso
app.post("/cursos", (req, res) => {
  const { titulo, vagas, categoria } = req.body;

  if (!titulo || vagas === undefined || !categoria) {
    return res.status(400).json({ erro: "Preencha todos os campos." });
  }

  if (Number(vagas) < 0) {
    return res.status(400).json({ erro: "O número de vagas não pode ser negativo." });
  }

  const novoCurso = {
    id: Date.now(),
    titulo,
    vagas: Number(vagas),
    categoria,
  };

  cursos.push(novoCurso);
  res.status(201).json(novoCurso);
});

// PUT - atualizar curso
app.put("/cursos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { titulo, vagas, categoria } = req.body;

  if (!titulo || vagas === undefined || !categoria) {
    return res.status(400).json({ erro: "Preencha todos os campos." });
  }

  if (Number(vagas) < 0) {
    return res.status(400).json({ erro: "O número de vagas não pode ser negativo." });
  }

  const curso = cursos.find((c) => c.id === id);

  if (!curso) {
    return res.status(404).json({ erro: "Curso não encontrado." });
  }

  curso.titulo = titulo;
  curso.vagas = Number(vagas);
  curso.categoria = categoria;

  res.json(curso);
});

// DELETE - excluir curso
app.delete("/cursos/:id", (req, res) => {
  const id = Number(req.params.id);
  const existe = cursos.find((c) => c.id === id);

  if (!existe) {
    return res.status(404).json({ erro: "Curso não encontrado." });
  }

  cursos = cursos.filter((c) => c.id !== id);
  res.json({ mensagem: "Curso excluído com sucesso." });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
