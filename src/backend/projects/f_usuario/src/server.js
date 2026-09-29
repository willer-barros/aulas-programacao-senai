import express from "express";
import cors from "cors";
import {prisma} from "./lib/prisma.ts"

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get("/users", async (req, res) => {
  try {
    const user = await prisma.user.findMany();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error não foi possivel ler todos usuarios" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro a atualizar" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao apagar" });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando...`);
});
