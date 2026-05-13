async function cadastrar() {
    console.log("Botao clicado")
    const nome = document.getElementById('nomeAluno').value;

  const resposta = await fetch('http://localhost:3000/alunos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  });

  if (resposta.ok) {
    atualizarLista();
  }
}
document.getElementById('btn-enviar').addEventListener('click', cadastrar);



async function atualizarLista() {
  const res = await fetch('http://localhost:3000/alunos');
  const dados = await res.json();
  
  const lista = document.getElementById('lista');
  lista.innerHTML = dados.map(a => `<li>${a.nome}</li>`).join('');
}

async function deletarItem(id) {
  const resposta = await fetch(`http://localhost:3000/alunos/${id}`, {
    method: 'DELETE'
  });

  if (resposta.ok) {
    atualizarLista();
  }
}

async function editarItem(id) {
  const novoNome = prompt("Digite o novo nome:");

  const resposta = await fetch(`http://localhost:3000/alunos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: novoNome })
  });

  if (resposta.ok) {
    atualizarLista();
  }
}

// Carregar ao abrir a página
atualizarLista();

