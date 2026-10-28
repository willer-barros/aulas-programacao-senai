import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";
import cookieParser from "cookie-parser";

const PORT = 3000;
const JWT_SECRET = "8*&&TGFHnfrjehgfeo"
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
  }),
);

app.use(cookieParser());

app.get("/", async () => {
  res.json({ message: "Funcionando" });
});

function autenticarToken(req, res){
  const token = req.cookies.token;
  if(!token){
    return res.json(message: "Acesso negado")
  }

  try{
    const usuario = jwt.verify(token, JWT_SECRET)
    req.usuario = usuario;
    next();
  } catch(error){
      return res.json({message: "Invalido ou expirado"})
  }

}

function autorizarCargo(...cargosPermitidos){
  return (req, res, next) =>{
    if(!req.usuario || !cargosPermitidos.includes(req.usuario.cargo)){
        return res.json({message: "Acesso Proibido"});
    }
    next();
  }
}

app.post('/api/cadastrar', async (req, res) => {
  const { nome, email, senha, cpf, cargo } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const cpfHash = await bcrypt.hash(cpf, 10); // LGPD
    const perfilCargo = cargo || 'CLIENTE';

    const query = `
      INSERT INTO clientes (nome, email, senha, cpf, cargo) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING id, nome, email, cargo
    `;
    const resultado = await db.query(query, [nome, email, senhaHash, cpfHash, perfilCargo]);

    return res.status(201).json({ mensagem: 'Cadastrado com sucesso!', usuario: resultado.rows[0] });
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro ao cadastrar.', erro: err.message });
  }
});

// ROTA 2: Login (Gera Cookie HttpOnly)
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const query = 'SELECT * FROM clientes WHERE email = $1';
    const resultado = await db.query(query, [email]);
    const usuario = resultado.rows[0];

    if (!usuario) return res.status(401).json({ mensagem: 'Credenciais inválidas.' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ mensagem: 'Credenciais inválidas.' });

    // Payload com cargo para RBAC
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, cargo: usuario.cargo, nome: usuario.nome },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Envio do Token via Cookie Protegido
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Mudar para true em produção (HTTPS)
      sameSite: 'lax',
      maxAge: 3600000
    });

    return res.json({ mensagem: 'Login bem-sucedido!', usuario: { nome: usuario.nome, cargo: usuario.cargo } });
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro no servidor.' });
  }
});

// ROTA 3: Perfil (Qualquer Usuário Logado)
app.get('/api/meu-perfil', autenticarToken, (req, res) => {
  return res.json({ mensagem: 'Bem-vindo ao seu painel!', usuario: req.usuario });
});

// ROTA 4: Painel Administrativo (Apenas ADMIN via RBAC)
app.get('/api/admin/clientes', autenticarToken, autorizarCargos('ADMIN'), async (req, res) => {
  try {
    const query = 'SELECT id, nome, email, cargo FROM clientes';
    const resultado = await db.query(query);
    return res.json({ clientes: resultado.rows });
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro ao listar clientes.' });
  }
});

// ROTA 5: Logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ mensagem: 'Sessão encerrada.' });
});

app.listen(PORT, () => {
  console.log("API rodando");
});
