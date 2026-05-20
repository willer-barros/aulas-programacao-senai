const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

let cursos = [
  {
    id: 1,
    titulo: 'React do Zero ao Avançado',
    vagas: 30,
    categoria: 'Frontend',
  },
  {
    id: 2,
    titulo: 'Node.js e APIs RESTful',
    vagas: 25,
    categoria: 'Backend',
  },
  {
    id: 3,
    titulo: 'UI/UX Design com Figma',
    vagas: 20,
    categoria: 'Design',
  },
];

app.get('/cursos', (req, res) => {
  res.status(200).json(cursos);
});

app.post('/cursos', (req, res) => {
  const { titulo, vagas, categoria } = req.body;

  if (vagas < 0) {
    return res.status(400).json({
      erro: 'O número de vagas não pode ser negativo.',
    });
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

app.put('/cursos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { titulo, vagas, categoria } = req.body;

  if (vagas < 0) {
    return res.status(400).json({
      erro: 'O número de vagas não pode ser negativo.',
    });
  }

  const index = cursos.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Curso não encontrado.' });
  }

  cursos[index] = { ...cursos[index], titulo, vagas: Number(vagas), categoria };
  res.status(200).json(cursos[index]);
});

app.delete('/cursos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = cursos.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Curso não encontrado.' });
  }

  const removido = cursos.splice(index, 1);
  res.status(200).json({ mensagem: 'Curso removido com sucesso.', curso: removido[0] });
});

app.listen(PORT, () => {
  console.log(` Servidor rodando em http://localhost:${PORT}`);
});