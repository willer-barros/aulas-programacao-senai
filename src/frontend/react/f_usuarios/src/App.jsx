import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000";

function App() {
  const [users, setUsers] = useState([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [editingId, setEditingId] = useState(null);

  async function fetchUsers() {
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();
    setUsers(data);
  }


  //nao esquecer de falar na aula o que essa flag faz
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      await fetch(`${API_URL}/users/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, idade: Number(idade) }),
      });
      setEditingId(null);
    } else {
      await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, idade: Number(idade) }),
      });
    }

    setNome("");
    setIdade("");
    fetchUsers();
  }

  async function handleDelete(id) {
    await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
    fetchUsers();
  }

  function handleEdit(user) {
    setEditingId(user.id);
    setNome(user.nome);
    setIdade(user.idade);
  }

  const listaUsuarios = users.map((user) => (
    <li key={user.id} className="user-item">
      <span>{user.nome} - {user.idade} anos</span>
      <div>
        <button onClick={() => handleEdit(user)}>Editar</button>
        <button onClick={() => handleDelete(user.id)}>Excluir</button>
      </div>
    </li>
  ));

  return (
    <>
      <h1>Usuários</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          required
        />
        <button type="submit">{editingId ? "Atualizar" : "Criar"}</button>
      </form>

      <ul className="lista-usuarios">{listaUsuarios}</ul>
    </>
  );
}

export default App;