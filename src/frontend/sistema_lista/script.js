async function cadastrar() {
    const nome = document.getElementById('nomeAluno').value;
    if (!nome) return;

    await fetch('http://localhost:3000/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome })
    });

    document.getElementById('nomeAluno').value = '';
    atualizarLista();
}

async function deletar(id) {
    await fetch(`http://localhost:3000/alunos/${id}`, {
        method: 'DELETE'
    });
    atualizarLista();
}

async function editar(id, nomeAtual) {
    const novoNome = prompt('Novo nome:', nomeAtual);
    if (!novoNome) return;

    await fetch(`http://localhost:3000/alunos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novoNome })
    });

    atualizarLista();
}

async function atualizarLista() {
    const res = await fetch('http://localhost:3000/alunos');
    const dados = await res.json();

    const lista = document.getElementById('lista');
    lista.innerHTML = dados.map(a => `
        <li>
            <span>${a.nome}</span>
            <div class="acoes">
                <button class="btn-editar" onclick="editar(${a.id}, '${a.nome}')">Editar</button>
                <button class="btn-deletar" onclick="deletar(${a.id})">Deletar</button>
            </div>
        </li>
    `).join('');
}

document.getElementById('btn-enviar').addEventListener('click', cadastrar);

atualizarLista();
