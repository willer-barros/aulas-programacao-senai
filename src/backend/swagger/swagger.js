import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Produtos — Catálogo",
      version: "1.0.0",
      description:
        "Documentação da API REST de gerenciamento de produtos com Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de Desenvolvimento",
      },
    ],
  },
  // Caminho para os arquivos onde estão as anotações do Swagger
  apis: ["./server.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
