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
  // versão simples: mostrar nome + editar/delete (prompt/confirm)
  lista.innerHTML = dados.map(a => `
    <li data-id="${a.id}">
      ${a.nome}
      <button class="editar">Editar</button>
      <button class="deletar">Deletar</button>
    </li>
  `).join('')

  // listeners simples
  lista.querySelectorAll('.deletar').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const li = e.target.closest('li')
      const id = li.dataset.id
      if(confirm('Tem certeza que deseja deletar?')){
        const r = await fetch(`http://localhost:3000/alunos/${id}`, { method: 'DELETE' })
        if(r.ok) atualizarLista()
        else alert('Erro ao deletar')
      }
    })
  })

  lista.querySelectorAll('.editar').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const li = e.target.closest('li')
      const id = li.dataset.id
      const novo = prompt('Novo nome:', li.firstChild.textContent.trim())
      if(novo && novo.trim()){
        const r = await fetch(`http://localhost:3000/alunos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: novo.trim() })
        })
        if(r.ok) atualizarLista()
        else alert('Erro ao atualizar')
      }
    })
  })
}

// Carregar ao abrir a página
atualizarLista();