async function cadastrar() {
    const inp = document.getElementById('nomeAluno');
    const nome = inp.value.trim();
    if (!nome) return;
    const res = await fetch('http://localhost:3000/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome })
    });
    if (res.ok) {
        const novo = await res.json();
        inp.value = '';
        appendAluno(novo);
    } else {
        console.error('POST falhou', res.status);
    }
}
document.getElementById('btn-enviar').addEventListener('click', cadastrar);

function appendAluno(a) {
    console.log('appendAluno', a);
    const tpl = document.getElementById('tpl-aluno');
    // clona o <li> dentro do template (evita elementos aninhados)
    const li = tpl.content.firstElementChild.cloneNode(true);
    li.dataset.id = a.id;
    li.querySelector('.nome').textContent = a.nome;
    document.getElementById('lista').appendChild(li);
}

async function getLista() {
    const res = await fetch('http://localhost:3000/alunos');
    const dados = await res.json();
    const lista = document.getElementById('lista');
    lista.innerHTML = '';
    dados.forEach(appendAluno);
}
document.getElementById('lista').addEventListener('click', async (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const id = li.dataset.id;
    if (e.target.classList.contains('editar')) {
        const atual = li.querySelector('.nome').textContent;
        const novo = prompt('Novo nome:', atual);
        if (!novo) return;
        await fetch(`http://localhost:3000/alunos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: novo })
        });
        li.querySelector('.nome').textContent = novo;
    }
    if (e.target.classList.contains('excluir')) {
        if (!confirm('Confirma exclusão?')) return;
        await fetch(`http://localhost:3000/alunos/${id}`, { method: 'DELETE' });
        li.remove();
    }
});

// carregar inicial
getLista();