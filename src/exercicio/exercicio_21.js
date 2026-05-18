const express = require("express");
const app = express();

app.use(express.json());

let tarefas = [
  { id: 1, descricao: "Estudar Express", concluida: false }
];
let proximoId = 2;

app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

app.post("/tarefas", (req, res) => {
  const { descricao } = req.body;

  const novaTarefa = {
    id: proximoId++,
    descricao: descricao,
    concluida: false
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.put("/tarefas/:id", (req, res) => {
  const idBuscado = parseInt(req.params.id);
  const { descricao, concluida } = req.body;

  const tarefa = tarefas.find(t => t.id === idBuscado);

  if (!tarefa) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  if (descricao !== undefined) tarefa.descricao = descricao;
  if (concluida !== undefined) tarefa.concluida = concluida;

  res.json(tarefa);
});

app.delete("/tarefas/:id", (req, res) => {
  const idBuscado = parseInt(req.params.id);
  
  const indice = tarefas.findIndex(t => t.id === idBuscado);

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  tarefas.splice(indice, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});
