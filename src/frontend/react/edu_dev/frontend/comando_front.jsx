// Agora que a API está pronta, vocês construirão a interface que consome esses dados utilizando a Fetch API nativa do navegador.

// 📋 Requisitos de Componentes e Telas
// A tela principal do sistema deve ser dividida visualmente em três áreas:

// O Painel de Controle (Dashboard):

// Exibir um card com o "Total de Cursos Cadastrados".

// Exibir um card com a "Soma Total de Vagas Disponíveis" na escola (Dica: use o método .reduce() no array de cursos recebido do backend).

// O Formulário Inteligente:

// Deve conter campos para preencher o Título, Vagas e Categoria.

// Deve possuir um único botão que muda de texto dinamicamente: se o usuário estiver criando um curso, o botão diz "Cadastrar Curso". Se o usuário clicou para editar um curso existente, o botão muda para "Salvar Alterações".

// A Listagem de Cursos:

// Exibir os cursos em formato de lista ou cards estruturados.

// Cada curso deve exibir claramente suas informações e conter dois botões de ação: "Editar" e "Excluir".

// 🔄 Fluxo de Integração (Como o código deve se comportar)
// Assim que a página carregar, o React deve fazer um disparo GET para a API e renderizar a lista na tela.

// Ao clicar em "Excluir", o React deve disparar o método DELETE para o backend e, logo em seguida, atualizar a lista na tela para que o curso suma imediatamente.

// Ao clicar em "Editar", o React não faz uma requisição ainda; ele deve apenas pegar os dados daquele curso específico e preenchê-los de volta nos campos do formulário, ativando o "modo de edição".

// Ao clicar em enviar o formulário, o código deve avaliar se está editando (dispara PUT) ou criando (dispara POST).