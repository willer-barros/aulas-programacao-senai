import express from "express";
import pg from "pg";
import "dotenv/config";

const { Pool } = pg;
const app = express();
app.use(express.json());

const OLLAMA_URL =
  process.env.OLLAMA_URL || "http://localhost:11434/api/generate";
const MODEL_NAME = process.env.MODEL_NAME || "llama3.2:3b";
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDB() {
  const query = `
    CREATE TABLE IF NOT EXISTS atendimentos (
      id SERIAL PRIMARY KEY,
      paciente VARCHAR(255) NOT NULL,
      idade INT NOT NULL,
      sintomas TEXT NOT NULL,
      prioridade VARCHAR(100) NOT NULL,
      especialidade VARCHAR(100) NOT NULL,
      justificativa TEXT NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  console.log("Tabela atendimentos verificada/criada no PostgreSQL.");
}

async function classificarComOllama(idade, sintomas) {
  const prompt = `
Você é um enfermeiro chefe de triagem hospitalar. Analise o paciente abaixo e classifique o atendimento.
Paciente: ${idade} anos.
Sintomas relatados: "${sintomas}"

Responda ESTRITAMENTE em formato JSON válido, sem markdown ou texto adicional, usando exatamente estas chaves:
- "prioridade": escolha entre "VERMELHO (Emergência)", "LARANJA (Muito Urgente)", "AMARELO (Urgente)", "VERDE (Pouco Urgente)" ou "AZUL (Não Urgente)".
- "especialidade": setor indicado (ex: Cardiologia, Ortopedia, Clínica Geral, Pediatria, Neurologia, Pronto-Socorro).
- "justificativa": frase curta de 1 linha explicando o motivo clínico da classificação.
`;

  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL_NAME,
      prompt,
      format: "json",
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Falha na comunicação com Ollama: ${response.statusText}`);
  }

  const data = await response.json();
  return JSON.parse(data.response);
}

// Rota de Triagem
app.post("/triagem", async (req, res) => {
  try {
    const { paciente, idade, sintomas } = req.body;

    if (!paciente || !idade || !sintomas) {
      return res
        .status(400)
        .json({ erro: "Campos paciente, idade e sintomas são obrigatórios." });
    }

    const analise = await classificarComOllama(idade, sintomas);

    const insertQuery = `
      INSERT INTO atendimentos (paciente, idade, sintomas, prioridade, especialidade, justificativa)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      paciente,
      Number(idade),
      sintomas,
      analise.prioridade || "AMARELO (Urgente)",
      analise.especialidade || "Clínica Geral",
      analise.justificativa || "Avaliação padrão.",
    ];

    const { rows } = await pool.query(insertQuery, values);
    return res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Erro na triagem:", error);
    return res
      .status(502)
      .json({ erro: "Erro ao processar triagem", detalhes: error.message });
  }
});

// Rota para listar fila de atendimentos
app.get("/atendimentos", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM atendimentos ORDER BY id DESC",
    );
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar atendimentos." });
  }
});

// Inicializa o banco antes de abrir a porta HTTP
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor de Triagem rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro fatal ao conectar no PostgreSQL:", err);
    process.exit(1);
  });
