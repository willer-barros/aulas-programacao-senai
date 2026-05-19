const express = require("express");

const app = express();
app.use(express.json());

let tarefas = [];
let proximoId = 1;

app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

app.post("/tarefas", (req, res) => {
  const { descricao } = req.body;

  const novaTarefa = {
    id: proximoId++,
    descricao,
    concluida: false
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

app.put("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);

  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({
      mensagem: "Tarefa não encontrada"
    });
  }

  const { descricao, concluida } = req.body;

  if (descricao !== undefined) {
    tarefa.descricao = descricao;
  }

  if (concluida !== undefined) {
    tarefa.concluida = concluida;
  }

  res.json(tarefa);
});

app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = tarefas.findIndex(t => t.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Tarefa não encontrada"
    });
  }

  tarefas.splice(indice, 1);

  res.json({
    mensagem: "Tarefa removida com sucesso"
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});