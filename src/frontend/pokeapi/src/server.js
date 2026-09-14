import express from 'express';
// import { prisma } from './lib/prisma.ts';
import {prisma} from "./lib/prisma.ts"

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/pokemons', async (req, res) => {
  const { numero, nome, tipo, nivel } = req.body;
  try {
    const novoPokemon = await prisma.pokemon.create({
      data: {
        numero: Number(numero),
        nome,
        tipo,
        nivel: nivel ? Number(nivel) : 1
      }
    });
    return res.status(201).json(novoPokemon);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao cadastrar o Pokémon.' });
  }
});

app.get('/pokemons', async (req, res) => {
  const { tipo } = req.query;
  try {
    const pokemons = await prisma.pokemon.findMany({
      where: tipo ? { tipo: { equals: tipo, mode: 'insensitive' } } : {},
      select: { id: true, numero: true, nome: true, tipo: true, nivel: true } 
    });
    return res.json(pokemons);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar os Pokémon.' });
  }
});

app.get('/pokemons/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = await prisma.pokemon.findUnique({
      where: { id: Number(id) }
    });
    if (!pokemon) return res.status(404).json({ error: 'Pokémon não encontrado.' });
    return res.json(pokemon);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar o Pokémon.' });
  }
});

app.put('/pokemons/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, tipo, nivel } = req.body;
  try {
    const pokemonAtualizado = await prisma.pokemon.update({
      where: { id: Number(id) },
      data: {
        nome,
        tipo,
        nivel: nivel ? Number(nivel) : undefined
      }
    });
    return res.json(pokemonAtualizado);
  } catch (error) {
    return res.status(404).json({ error: 'Pokémon não encontrado ou erro na atualização.' });
  }
});

app.delete('/pokemons/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.pokemon.delete({
      where: { id: Number(id) }
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ error: 'Pokémon não encontrado para exclusão.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Treinador, sua PokéAPI está online em http://localhost:${PORT}`);
});