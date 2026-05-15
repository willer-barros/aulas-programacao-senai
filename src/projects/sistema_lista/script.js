// ...existing code...
async function cadastrar() {
  const nomeInput = document.getElementById('nomeAluno');
  const nome = (nomeInput.value || '').trim();
  if (!nome) {
    alert('Digite o nome do aluno');
    return;
  }

  const resposta = await fetch('http://localhost:3000/alunos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  });

  if (resposta.ok) {
    nomeInput.value = '';
    atualizarLista();
  } else {
    alert('Erro ao cadastrar');
  }
}
document.getElementById('btn-enviar').addEventListener('click', cadastrar);

async function atualizarLista() {
  const res = await fetch('http://localhost:3000/alunos');
  if (!res.ok) {
    document.getElementById('lista').innerHTML = '<li>Erro ao carregar</li>';
    return;
  }
  const dados = await res.json();

  const lista = document.getElementById('lista');
  if (!dados.length) {
    lista.innerHTML = '<li>Nenhum aluno cadastrado</li>';
    return;
  }

  lista.innerHTML = dados.map(a => `
    <li data-id="${a.id}">
      <span class="nome">${a.nome}</span>
      <button class="editar">Editar</button>
      <button class="deletar">Excluir</button>
    </li>
  `).join('');
}

// Delegação de eventos para editar / excluir individual
document.getElementById('lista').addEventListener('click', async (e) => {
  const btn = e.target;
  const li = btn.closest('li');
  if (!li) return;
  const id = li.dataset.id;

  if (btn.classList.contains('deletar')) {
    if (!confirm('Excluir este aluno?')) return;
    const res = await fetch(`http://localhost:3000/alunos/${id}`, { method: 'DELETE' });
    if (res.ok || res.status === 204) {
      atualizarLista();
    } else {
      alert('Erro ao excluir');
    }
    return;
  }

  if (btn.classList.contains('editar')) {
    const nomeSpan = li.querySelector('.nome');
    const novoNome = prompt('Novo nome do aluno:', nomeSpan ? nomeSpan.textContent.trim() : '');
    if (!novoNome || !novoNome.trim()) return;
    const res = await fetch(`http://localhost:3000/alunos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: novoNome.trim() })
    });
    if (res.ok) {
      atualizarLista();
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.error || 'Erro ao atualizar');
    }
  }
});

// Carregar ao abrir a página
atualizarLista();

// Botão para deletar todos os alunos
document.getElementById('btn-deletar-todos').addEventListener('click', async () => {
  if (!confirm('Deseja excluir todos os alunos?')) return;
  try {
    const res = await fetch('http://localhost:3000/alunos');
    if (!res.ok) throw new Error('Falha ao obter lista');
    const dados = await res.json();
    await Promise.all(dados.map(a => fetch(`http://localhost:3000/alunos/${a.id}`, { method: 'DELETE' })));
    atualizarLista();
  } catch (err) {
    alert('Erro ao deletar todos: ' + (err.message || err));
  }
});
// ...existing code...
