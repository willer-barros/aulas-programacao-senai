async function cadastrar() {
    console.log("Botao clicado")
    const nome = document.getElementById('nomeAluno').value;
    const resposta = await fetch('http://localhost:3000/alunos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome })
    });

    if (resposta.ok) {
        atualizarLista();
    }
}

document.getElementById('btn-enviar')
.addEventListener('click', cadastrar);


async function excluirAluno(id) {
    await fetch(`http://localhost:3000/alunos/${id}`, {
        method: 'DELETE'
    })

    atualizarLista()
}

async function atualizarLista() {

    const res = await fetch('http://localhost:3000/alunos');
    const dados = await res.json();
    const lista = document.getElementById('lista');
    lista.innerHTML = dados.map(a => `
        <li>${a.nome}<button onclick="atualisarNome(${a.id})">Editar</buttom>

        <button onclick="excluirAluno(${a.id})">Excluir</button></li>
        `).join('');
}

atualizarLista();

async function atualizarNome(id) {
        const novoNome = prompt("Digite o novo nome:")
        if(!novoNome) return;
        await fetch(`http://localhost:3000/alunos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'Aplication/json'
        },
        body:json.stringify({
            nome: novoNome
        })
    });

    atualizarLista()
}

async function atualizarLista(){
    const res = await fetch ('http://localhost:3000/alunos');
}
