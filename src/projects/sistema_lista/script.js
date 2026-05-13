const input = document.getElementById('nomeAluno')
const btn = document.getElementById('btn-enviar')
const lista = document.getElementById('lista')

async function carregar() {
  const res = await fetch('/alunos')
  const alunos = await res.json()
  lista.innerHTML = ''
  alunos.forEach(a => {
  const li = document.createElement('li')
  li.textContent = a.nome + ' '
  const btnDel = document.createElement('button')
  btnDel.textContent = 'Excluir'
  btnDel.onclick = async () => {
    await fetch(`/alunos/${a.id}`, { method: 'DELETE' })
    carregar()
}
const btnEdit = document.createElement('button')
btnEdit.textContent = 'Editar'
btnEdit.onclick = async () => {
  const novo = prompt('Novo nome', a.nome)
  if (!novo) return
  await fetch(`/alunos/${a.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: novo })
  })
  carregar()
}
  li.appendChild(btnEdit)
  li.appendChild(btnDel)
  lista.appendChild(li)
})
}

btn.addEventListener('click', async () => {
  const nome = input.value.trim()
  if (!nome) return
  await fetch('/alunos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  })
  input.value = ''
  carregar()
})

carregar()