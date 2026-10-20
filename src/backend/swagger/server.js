import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const fastify = Fastify({ logger: true });

async function build() {
  // 1. Registra a especificação Swagger
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "API com Fastify (ES Modules)",
        description: "Swagger gerado via Schemas com import/export",
        version: "1.0.0",
      },
    },
  });

  // 2. Registra a interface visual do Swagger UI
  await fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });

  // Banco de dados em memória
  const usuarios = [{ id: 1, nome: "Ana" }];

  // --- ROTAS ---

  // GET /usuarios
  fastify.get(
    "/usuarios",
    {
      schema: {
        description: "Retorna a lista de todos os usuários",
        tags: ["Usuários"],
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer" },
                nome: { type: "string" },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      return usuarios;
    },
  );

  // POST /usuarios
  fastify.post(
    "/usuarios",
    {
      schema: {
        description: "Cadastra um novo usuário",
        tags: ["Usuários"],
        body: {
          type: "object",
          required: ["nome"],
          properties: {
            nome: { type: "string" },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "integer" },
              nome: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { nome } = request.body;
      const novoUsuario = { id: usuarios.length + 1, nome };
      usuarios.push(novoUsuario);

      return reply.status(201).send(novoUsuario);
    },
  );

  // Inicialização do servidor
  try {
    await fastify.listen({ port: 3000 });
    console.log("🚀 Servidor rodando em http://localhost:3000");
    console.log("📄 Swagger UI disponível em http://localhost:3000/docs");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

build();
