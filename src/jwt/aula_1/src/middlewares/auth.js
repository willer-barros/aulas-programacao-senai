import jwt from "jsonwebtoken"
import jwtConfig from "../config/jwt.js"

function verificarToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token){
        return res.status(401).json({ erro: "Acesso negado. Token não fornecidos"})
    }

    try{
        const dadosVerificados = jwt.verify(token, jwtConfig.SECRET_KEY)
        req.utilizador = dadosVerificados
        next()
    } catch(erro){
        return res.status(403).json({erro: "Token invalido ou expirado"})
    }
}

export default verificarToken;