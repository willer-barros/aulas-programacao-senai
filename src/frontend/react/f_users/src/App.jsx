import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Lista de usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.nome} - {user.idade}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
