const express = require('express');

const app = express();
app.use(express.json());

let cursos = [
  { id: '1', titulo: 'HTML & CSS Básico', vagas: 20, categoria: 'Frontend' },
  { id: '2', titulo: 'JavaScript Avançado', vagas: 15, categoria: 'Frontend' },
  { id: '3', titulo: 'Node.js APIs', vagas: 10, categoria: 'Backend' }
];

// GET
app.get('/cursos', (req, res) => {
  res.json(cursos);
});

// POST 
app.post('/cursos', (req, res) => {
  const { titulo, vagas, categoria } = req.body;

  if (typeof vagas !== 'number' || Number.isNaN(vagas)) {
    return res.status(400).json({ erro: 'Campo "vagas" deve ser um número.' });
  }
  if (vagas < 0) {
    return res.status(400).json({ erro: 'O número de vagas não pode ser negativo.' });
  }
  if (!titulo || !categoria) {
    return res.status(400).json({ erro: 'Campos "titulo" e "categoria" são obrigatórios.' });
  }

  const novoCurso = {
    id: Date.now().toString(),
    titulo,
    vagas,
    categoria
  };

  cursos.push(novoCurso);
  res.status(201).json(novoCurso);
});

// PUT
app.put('/cursos/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, vagas, categoria } = req.body;

  if (vagas !== undefined) {
    if (typeof vagas !== 'number' || Number.isNaN(vagas)) {
      return res.status(400).json({ erro: 'Campo "vagas" deve ser um número.' });
    }
    if (vagas < 0) {
      return res.status(400).json({ erro: 'O número de vagas não pode ser negativo.' });
    }
  }

  const index = cursos.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Curso não encontrado.' });
  }

  // Atualiza apenas os campos fornecidos
  if (titulo !== undefined) cursos[index].titulo = titulo;
  if (vagas !== undefined) cursos[index].vagas = vagas;
  if (categoria !== undefined) cursos[index].categoria = categoria;

  res.json(cursos[index]);
});

// DELETE
app.delete('/cursos/:id', (req, res) => {
  const { id } = req.params;
  const index = cursos.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Curso não encontrado.' });
  }
  const removido = cursos.splice(index, 1)[0];
  res.json({ mensagem: 'Curso removido com sucesso.', curso: removido });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});