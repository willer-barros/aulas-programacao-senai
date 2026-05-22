const express = require("express")

const app = express()

app.use(express.json())

const PORT = 3000

let usuarios = []

let proximoId = 1

app.post("/usuarios/cadastro", (req, res) => {
    const { email, senha } = req.body

    const usuarioExistente = usuarios.find(
        usuario => usuario.email === email
    )

    if (usuarioExistente) {
        return res.status(409).json({
            mensagem: "E-mail já cadastrado"
        })
    }

    if (senha.length < 6) {
        return res.status(400).json({
            mensagem: "A senha deve ter no mínimo 6 caracteres"
        })
    }

    const novoUsuario = {
        id: proximoId++,
        email,
        senha,
        ativo: true
    }

    usuarios.push(novoUsuario)

    res.status(201).json({
        mensagem: "Usuário cadastrado com sucesso",
        usuario: novoUsuario
    })
})

app.post("/usuarios/login", (req, res) => {
    const { email, senha } = req.body

    const usuario = usuarios.find(
        usuario => usuario.email === email && usuario.senha === senha
    )

    if (!usuario) {
        return res.status(401).json({
            mensagem: "Credenciais inválidas"
        })
    }

    res.status(200).json({
        mensagem: "Login efetuado com sucesso"
    })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
