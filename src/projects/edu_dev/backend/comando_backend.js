// Seu objetivo é criar uma API REST funcional. Como ainda não estamos usando um banco de dados real, vocês utilizarão um Array de Objetos em memória para armazenar as informações.

// 📋 Especificações do "Banco de Dados" (Array)
// O array deve começar com pelo menos 3 cursos já cadastrados. Cada curso (objeto) deve possuir:

// id (Número ou String única)

// titulo (String)

// vagas (Número)

// categoria (String - ex: "Frontend", "Backend")

// 🛠️ Desafio das Rotas (Endpoints)
// Vocês devem programar um servidor Express que escute na porta 3002 e responda às seguintes requisições:

// Listagem Geral (GET /cursos): Deve retornar o array completo de cursos em formato JSON.

// Cadastro (POST /cursos): Deve receber os dados do novo curso pelo corpo da requisição (req.body), gerar um ID único automaticamente (Dica: use Date.now()) e adicionar o novo objeto ao array.

// Atualização (PUT /cursos/:id): Deve receber o ID do curso pelos parâmetros da URL e os novos dados pelo corpo da requisição. O servidor deve localizar o curso correspondente no array e atualizar suas informações.

// Exclusão (DELETE /cursos/:id): Deve receber o ID pelos parâmetros da URL e remover o curso correspondente do array.

// ⚠️ Regra de Negócio Obligatória (H1): No cadastro e na atualização, o sistema não deve aceitar números negativos no campo vagas. Se o usuário tentar enviar um valor menor que zero, o servidor deve responder com o status de erro 400 (Bad Request) e uma mensagem explicativa.