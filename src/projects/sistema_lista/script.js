const input = document.getElementById('nomeAluno');
const btnEnviar = document.getElementById('btn-enviar');
const lista = document.getElementById('lista');
const form = document.getElementById('form-nome');

function criarItemLista(nome) {
    const li = document.createElement('li');
    li.className = 'item-aluno';

    const span = document.createElement('span');
    span.textContent = nome;
    li.appendChild(span);

    const btnExcluir = document.createElement('button');
    btnExcluir.type = 'button';
    btnExcluir.className = 'btn-excluir';
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(btnExcluir);
    return li;
}

function adicionarNome() {
    const nome = input.value.trim();
    if (!nome) {
        input.focus();
        return;
    }
    const item = criarItemLista(nome);
    lista.appendChild(item);
    input.value = '';
    input.focus();
}

btnEnviar.addEventListener('click', adicionarNome);

// permitir enviar com Enter
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        adicionarNome();
    }
});

// opcional: evitar recarregar se form for submetido
form.addEventListener('submit', (e) => {
    e.preventDefault();
    adicionarNome();
});