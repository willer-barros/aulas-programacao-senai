const express = require("express");
const app = express();

app.use(express.json());

const usuarios = [];
let proximoId = 1;

app.post("/usuarios/cadastro", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "E-mail e senha são obrigatórios" });
  }

  if (senha.length < 6) {
    return res.status(400).json({ mensagem: "A senha deve ter no mínimo 6 caracteres" });
  }

  const usuarioExiste = usuarios.find(u => u.email === email);
  if (usuarioExiste) {
    return res.status(409).json({ mensagem: "Este e-mail já está cadastrado" });
  }

  const novoUsuario = {
    id: proximoId++,
    email: email,
    senha: senha,
    ativo: true
  };

  usuarios.push(novoUsuario);
  res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", usuario: { id: novoUsuario.id, email: novoUsuario.email } });
});

app.post("/usuarios/login", (req, res) => {
  const { email, senha } = req.body;

  const usuario = usuarios.find(u => u.email === email);

  if (!usuario || usuario.senha !== senha) {
    return res.status(401).json({ mensagem: "Credenciais inválidas" });
  }

  res.status(200).json({ mensagem: "Login efetuado com sucesso" });
});

app.listen(3000, () => {
  console.log("API de Autenticação rodando em http://localhost:3000");
});
