import express from "express";
import {login, obterPerfil} from "../controllers/authController.js"
import verificarToken from "../middlewares/auth.js";

const router = express.Router()

router.post("/login", login)

router.get("/perfil", verificarToken, obterPerfil)

export default router;