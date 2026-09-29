import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000";

function App() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    async function fetchUsers() {
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();
    setUsers(data);
  }
    fetchUsers();
  }, []);




  const listaUsuarios = users.map((user) => (
    <li key={user.id} className="user-item">
      <span>{user.nome} - {user.idade} anos</span>
    </li>
  ));

  return (
    <>
      <h1>Usuários</h1>

      <ul className="lista-usuarios">{listaUsuarios}</ul>
    </>
  );
}

export default App;