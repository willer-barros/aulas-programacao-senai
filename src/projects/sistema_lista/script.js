const API = 'http://localhost:3000/alunos';

// ─── CADASTRAR ───────────────────────────────────────────
async function cadastrar() {
    const input = document.getElementById('nomeAluno');
    const nome = input.value.trim();
    if (!nome) return alert("Digite um nome!");

    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome })
    });

    input.value = '';       // limpa o campo
    atualizarLista();
}

// ─── EDITAR ──────────────────────────────────────────────
async function editar(id, nomeAtual) {
    const novoNome = prompt("Novo nome:", nomeAtual);
    if (!novoNome || novoNome === nomeAtual) return;

    await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novoNome })
    });

    atualizarLista();
}

// ─── DELETAR ─────────────────────────────────────────────
async function deletar(id) {
    if (!confirm("Tem certeza que quer remover?")) return;

    await fetch(`${API}/${id}`, { method: 'DELETE' });

    atualizarLista();
}

// ─── LISTAR ──────────────────────────────────────────────
async function atualizarLista() {
    const res = await fetch(API);
    const alunos = await res.json();

    const lista = document.getElementById('lista');

    // Para cada aluno, cria um <li> com botões de ação
    lista.innerHTML = alunos.map(a => `
        <li>
            <span>${a.nome}</span>
            <button onclick="editar(${a.id}, '${a.nome}')">✏️ Editar</button>
            <button onclick="deletar(${a.id})">🗑️ Deletar</button>
        </li>
    `).join('');
}

// ─── EVENTOS ─────────────────────────────────────────────
document.getElementById('btn-enviar').addEventListener('click', cadastrar);

// Carregar ao abrir
atualizarLista();