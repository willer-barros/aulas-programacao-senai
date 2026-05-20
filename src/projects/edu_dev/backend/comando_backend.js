const express = require('express');
const app = express();
app.use(express.json());

let cursos = [
  { id: 1, titulo: 'HTML e CSS', vagas: 30, categoria: 'Frontend' },
  { id: 2, titulo: 'Node.js com Express', vagas: 20, categoria: 'Backend' },
  { id: 3, titulo: 'React do Zero', vagas: 25, categoria: 'Frontend' },
];

app.get('/cursos', (_req, res) => {
  res.json(cursos);
});

app.post('/cursos', (req, res) => {
  const { titulo, vagas, categoria } = req.body;
  if (vagas < 0) {
    return res.status(400).json({ erro: 'O campo vagas não pode ser negativo.' });
  }
  const novoCurso = { id: Date.now(), titulo, vagas, categoria };
  cursos.push(novoCurso);
  res.status(201).json(novoCurso);
});

app.put('/cursos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { titulo, vagas, categoria } = req.body;
  if (vagas < 0) {
    return res.status(400).json({ erro: 'O campo vagas não pode ser negativo.' });
  }
  const curso = cursos.find(c => c.id === id);
  if (!curso) {
    return res.status(404).json({ erro: 'Curso não encontrado.' });
  }
  curso.titulo = titulo ?? curso.titulo;
  curso.vagas = vagas ?? curso.vagas;
  curso.categoria = categoria ?? curso.categoria;
  res.json(curso);
});

app.delete('/cursos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = cursos.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Curso não encontrado.' });
  }
  cursos.splice(index, 1);
  res.status(204).send();
});

app.listen(3002, () => console.log('Servidor rodando na porta 3002'));
