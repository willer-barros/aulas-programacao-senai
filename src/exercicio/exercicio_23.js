
const app = express()

app.use(express.json())

let usuarios = [
  { id: 1, email: 'dev@email.com', senha: '123456', ativo: true }
]
let proximoId = usuarios.length ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1

app.post('/usuarios/cadastro', (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' })
  }

  if (usuarios.some((u) => u.email === email)) {
    return res.status(409).json({ erro: 'Email já cadastrado' })
  }

  if (senha.length < 6) {
    return res.status(400).json({ erro: 'Senha deve ter no mínimo 6 caracteres' })
  }

  const novoUsuario = {
    id: proximoId++,
    email: email.trim(),
    senha: senha.trim(),
    ativo: true
  }

  usuarios.push(novoUsuario)
  res.status(201).json(novoUsuario)
})

app.post('/usuarios/login', (req, res) => {
  const { email, senha } = req.body

  const usuario = usuarios.find((u) => u.email === email)

  if (!usuario || usuario.senha !== senha) {
    return res.status(401).json({ erro: 'Credenciais inválidas' })
  }

  res.json({ mensagem: 'Login efetuado com sucesso' })
})

const PORTA = 3000
app.listen(PORTA, () => {
  console.log(`API de usuários rodando em http://localhost:${PORTA}`)
})
