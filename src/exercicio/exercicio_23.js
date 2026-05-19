const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.json());

// armazenamento em memória
const usuarios = [];
let nextId = 1;

// função simples para "hash" de senha (simulação segura usando sha256)
function hashSenha(senha) {
    return crypto.createHash('sha256').update(String(senha)).digest('hex');
}

// POST /usuarios/cadastro
// Regra 1: email único -> 409
// Regra 2: senha mínimo 6 chars -> 400
app.post('/usuarios/cadastro', (req, res) => {
    const { email, senha } = req.body;

    if (!email || typeof email !== 'string' || !email.trim()) {
        return res.status(400).json({ erro: 'E-mail é obrigatório' });
    }
    if (!senha || typeof senha !== 'string') {
        return res.status(400).json({ erro: 'Senha é obrigatória' });
    }
    if (senha.length < 6) {
        return res.status(400).json({ erro: 'Senha deve ter no mínimo 6 caracteres' });
    }

    const emailLower = email.trim().toLowerCase();
    const existe = usuarios.some(u => u.email.toLowerCase() === emailLower);
    if (existe) {
        return res.status(409).json({ erro: 'E-mail já cadastrado' });
    }

    const usuario = {
        id: nextId++,
        email: email.trim(),
        senhaHash: hashSenha(senha),
        ativo: true
    };
    usuarios.push(usuario);

    // retornar sem a senha/hash
    const { senhaHash, ...retorno } = usuario;
    res.status(201).json(retorno);
});

// POST /usuarios/login
// Se e-mail não existir ou senha incorreta -> 401 com "Credenciais inválidas"
app.post('/usuarios/login', (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ erro: 'E-mail e senha são obrigatórios' });
    }

    const usuario = usuarios.find(u => u.email.toLowerCase() === String(email).trim().toLowerCase());
    if (!usuario) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const senhaHash = hashSenha(senha);
    if (senhaHash !== usuario.senhaHash) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    res.status(200).json({ mensagem: 'Login efetuado com sucesso' });
});

// (opcional) endpoint para listar usuários (sem senhas) - útil para testes
app.get('/usuarios', (req, res) => {
    const lista = usuarios.map(({ senhaHash, ...u }) => u);
    res.json(lista);
});

// inicializa servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API de usuários rodando em http://localhost:${PORT}`);
});