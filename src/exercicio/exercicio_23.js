// API de Autenticação e Usuários (Validação de Dados)
// Objetivo: Praticar regras de negócio, criptografia simulada e códigos de status HTTP apropriados (400, 401, 409).

// Estrutura do Objeto: { id: 1, email: "dev@email.com", senha: "123", ativo: true }

// Endpoints a criar:

// POST /usuarios/cadastro: Cadastra um usuário.

// Regra 1: O e-mail não pode ser duplicado. Se já existir no array, retorne 409 (Conflict).

// Regra 2: A senha deve ter no mínimo 6 caracteres. Se for menor, retorne 400 (Bad Request).

// POST /usuarios/login: Recebe email e senha no corpo.

//Testar via postman

// Procure o usuário no array. Se o e-mail não existir ou a senha estiver incorreta, retorne 401 (Unauthorized) com a mensagem "Credenciais inválidas". Se tudo estiver certo, retorne 200 com "Login efetuado com sucesso".