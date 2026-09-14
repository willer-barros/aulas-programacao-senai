import jwt from "jsonwebtoken"
import jwtConfig from "../config/jwt.js"

const utilizadores = [
    { id: 42, email: "aluno@dev.com", senha: "123", perfil: "aluno"}
]

export const login = (req, res) =>{
    const {email, senha } = req.body;
    const utilizador = utilizadores.find(u=> u.email === email && u.senha === senha)

    if (!utilizador){
        return res.status(401).json({erro: "credenciais invalidas"})
    }

    const token = jwt.sign(
        {id: utilizador.id, email: utilizador.email, perfil},
        jwtConfig.SECRET_KEY,
        {expiresIn: jwtConfig.EXPIRES_IN}
    )

    return res.json({ mensagem: "Login efetuado com sucesso", token})
}   

export const obterPerfil = (req, res) =>{
    return res.json({
        mensagem: "Dados do perfil acedidos com segurança",
        utiliador: req.utiliador
    })
}