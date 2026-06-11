import express from "express";
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"


const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express())

app.use("/auth", authRoutes)
app.listen(PORT, ()=>{
    console.log("Servido rodando")
})