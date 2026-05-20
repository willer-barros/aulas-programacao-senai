# 🎓 Atividade Prática: EduDev - Sistema de Matrículas

## 📌 Objetivo
Desenvolver o MVP de um sistema de gerenciamento de cursos de tecnologia. Vocês devem construir uma API (Backend) em Node.js/Express e uma Interface (Frontend) em React.js. Os dados serão armazenados temporariamente em um Array no servidor.

---

## 🖥️ PARTE 1: O Backend (Node.js + Express)

Seu servidor deve rodar na porta `3002` (ou usar `process.env.PORT`).

### 1. Estrutura do Array (Banco de Dados)
O array global de `cursos` deve iniciar com pelo menos **3 cursos cadastrados manualmente**. Cada objeto de curso precisa ter:
* `id` (Número ou String única — ex: `Date.now()`)
* `titulo` (String)
* `vagas` (Número inteiro)
* `categoria` (String — ex: "Frontend", "Backend")

### 2. Rotas a Criar (Endpoints)
* **GET `/cursos`**: Retorna o array completo de cursos em formato JSON.
* **POST `/cursos`**: Recebe os dados do novo curso no `req.body`, gera o ID automático, adiciona no array e retorna o item criado.
* **PUT `/cursos/:id`**: Recebe o ID por parâmetro e os novos dados no `req.body`. Localiza o curso e atualiza suas informações no array.
* **DELETE `/cursos/:id`**: Recebe o ID por parâmetro e remove o curso correspondente do array.

### ⚠️ Regra de Negócio Obrigatória
No **POST** e no **PUT**, o sistema **não pode aceitar números negativos** no campo `vagas`. Se o valor for menor que zero, barra a requisição, devolve o status HTTP `400 (Bad Request)` e um JSON com uma mensagem de erro.

---

## 🎨 PARTE 2: O Frontend (React.js)

A interface deve consumir a API criada utilizando a **Fetch API** nativa. Divida a tela do React em 3 áreas:

### 1. Painel de Controle (Dashboard)
* Um card mostrando o **Total de Cursos Cadastrados**.
* Um card mostrando a **Soma Total de Vagas Disponíveis** (Dica: use `.reduce()` no array de cursos).

### 2. Formulário Dinâmico
* Inputs para: Título, Vagas e Categoria (`select`).
* **Botão Inteligente:** Se estiver criando um curso, o botão diz `"Cadastrar Curso"`. Se clicou para editar um curso existente, o texto muda para `"Salvar Alterações"`.

### 3. Listagem de Cursos
* Renderizar os cursos em formato de cards ou tabela.
* Cada item deve exibir seus dados e ter dois botões: **"Editar"** e **"Excluir"**.

---

## 🔄 Fluxo de Funcionamento (Comportamento do Estado)
1. **Carregamento:** Ao abrir a página, o React faz um `GET` automático para buscar os cursos do backend.
2. **Exclusão:** Ao clicar em "Excluir", o frontend dispara um `DELETE` com o ID para a API e atualiza a lista na tela.
3. **Edição (Ação inicial):** Ao clicar em "Editar", o frontend joga os dados daquele curso de volta para os campos do formulário e ativa o "modo de edição".
4. **Envio do Formulário:** Ao salvar, o código valida: se estiver editando, dispara `PUT`; se for um curso novo, dispara `POST`.

---

## 🔍 O que pesquisar se travar?
* **Express:** `req.body`, `req.params`, middleware `express.json()` e o pacote `cors`.
* **JavaScript:** Métodos `.findIndex()`, `.filter()` e `.reduce()`.
* **React:** Hooks `useState`, `useEffect` e manipulação de formulários (`onChange`).