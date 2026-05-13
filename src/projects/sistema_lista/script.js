const API_URL = "http://localhost:3000/alunos";

let alunos = [];

const inputNome = document.getElementById("inputNome");
const busca = document.getElementById("busca");
const erroEl = document.getElementById("erro");
const listaEl = document.getElementById("lista");
const vazioEl = document.getElementById("vazio");
const rodapeEl = document.getElementById("rodape");

document.getElementById("btn-adicionar").addEventListener("click", adicionarAluno);
document.getElementById("btn-limpar").addEventListener("click", limparTurma);

inputNome.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    adicionarAluno();
  }
});

busca.addEventListener("input", renderizarLista);

async function carregarAlunos() {
  const resposta = await fetch(API_URL);
  alunos = await resposta.json();
  renderizarLista();
}

function mostrarErro(mensagem) {
  erroEl.textContent = mensagem;

  setTimeout(() => {
    erroEl.textContent = "";
  }, 2500);
}

async function adicionarAluno() {
  const nome = inputNome.value.trim();

  if (!nome) {
    mostrarErro("Digite um nome.");
    return;
  }

  const existe = alunos.some(
    (aluno) => aluno.nome.toLowerCase() === nome.toLowerCase()
  );

  if (existe) {
    mostrarErro("Aluno já cadastrado.");
    return;
  }

  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome })
  });

  if (!resposta.ok) {
    mostrarErro("Erro ao cadastrar aluno.");
    return;
  }

  inputNome.value = "";

  carregarAlunos();
}

function alternarStatus(id) {
  const aluno = alunos.find((a) => a.id === id);

  if (!aluno) return;

  aluno.status =
    aluno.status === "neutro"
      ? "presente"
      : aluno.status === "presente"
      ? "ausente"
      : "neutro";

  renderizarLista();
}

function removerAluno(id) {
  alunos = alunos.filter((aluno) => aluno.id !== id);
  renderizarLista();
}

function limparTurma() {
  alunos = [];
  renderizarLista();
}

function renderizarLista() {
  const termo = busca.value.toLowerCase();

  const filtrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(termo)
  );

  const presentes = alunos.filter(
    (aluno) => aluno.status === "presente"
  ).length;

  const ausentes = alunos.filter(
    (aluno) => aluno.status === "ausente"
  ).length;

  document.getElementById("s-total").textContent = alunos.length;
  document.getElementById("s-pres").textContent = presentes;
  document.getElementById("s-aus").textContent = ausentes;

  vazioEl.style.display = alunos.length === 0 ? "block" : "none";

  rodapeEl.classList.toggle("oculto", alunos.length === 0);

  if (filtrados.length === 0 && alunos.length > 0) {
    listaEl.innerHTML =
      "<li class='mensagem-vazia'>Nenhum aluno encontrado.</li>";
    return;
  }

  listaEl.innerHTML = filtrados
    .map((aluno, index) => {
      const textoStatus =
        aluno.status === "presente"
          ? "Presente"
          : aluno.status === "ausente"
          ? "Ausente"
          : "Marcar";

      const classeStatus =
        aluno.status !== "neutro"
          ? `pill ${aluno.status}`
          : "pill";

      return `
        <li>
          <span class="num">${index + 1}</span>

          <span class="nome">${aluno.nome}</span>

          <span 
            class="${classeStatus}" 
            onclick="alternarStatus(${aluno.id})"
          >
            ${textoStatus}
          </span>

          <button 
            class="btn-remover"
            onclick="removerAluno(${aluno.id})"
          >
            ×
          </button>
        </li>
      `;
    })
    .join("");
}

carregarAlunos();