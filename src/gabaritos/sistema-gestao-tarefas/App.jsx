import { useState, useEffect } from "react";

export default function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroLogin, setErroLogin] = useState("");

  // Estados das telas
  const [colaboradores, setColaboradores] = useState([]);
  const [busca, setBusca] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);

  // Estados dos Formulários
  const [nomeColab, setNomeColab] = useState("");
  const [emailColab, setEmailColab] = useState("");
  const [cargoColab, setCargoColab] = useState("");

  const [tituloTarefa, setTituloTarefa] = useState("");
  const [descTarefa, setDescTarefa] = useState("");
  const [colabIdTarefa, setColabIdTarefa] = useState("");

  // 1. Função de Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErroLogin("");
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (res.ok) {
      const data = await res.json();
      setUsuarioLogado(data);
    } else {
      setErroLogin("E-mail ou senha incorretos.");
    }
  };

  // 2. Carregar Colaboradores (com busca)
  const carregarColaboradores = async () => {
    const res = await fetch(
      `http://localhost:3000/colaboradores?busca=${busca}`,
    );
    const data = await res.json();
    setColaboradores(data);
  };

  // 3. Carregar Agendamentos Ordenados
  const carregarAgendamentos = async () => {
    const res = await fetch("http://localhost:3000/agendamentos");
    const data = await res.json();
    setAgendamentos(data);
  };

  useEffect(() => {
    if (usuarioLogado) {
      carregarColaboradores();
      carregarAgendamentos();
    }
  }, [usuarioLogado, busca]);

  // Cadastrar Colaborador
  const handleCadastrarColaborador = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/colaboradores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nomeColab,
        email: emailColab,
        cargo: cargoColab,
      }),
    });
    setNomeColab("");
    setEmailColab("");
    setCargoColab("");
    carregarColaboradores();
  };

  // Cadastrar Tarefa
  const handleCadastrarTarefa = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/tarefas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: tituloTarefa,
        descricao: descTarefa,
        colaboradorId: colabIdTarefa,
      }),
    });
    setTituloTarefa("");
    setDescTarefa("");
    setColabIdTarefa("");
    carregarAgendamentos();
  };

  if (!usuarioLogado) {
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h2>Login — TaskFlow</h2>
        {erroLogin && <p style={{ color: "red" }}>{erroLogin}</p>}
        <form onSubmit={handleLogin}>
          <p>
            E-mail:{" "}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </p>
          <p>
            Senha:{" "}
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </p>
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {/* PAINEL PRINCIPAL / HEADER */}
      <header>
        <h2>Usuário Logado: {usuarioLogado.nome}</h2>
        <button onClick={() => setUsuarioLogado(null)}>Sair (Logout)</button>
      </header>

      <hr />

      {/* GERENCIAMENTO DE COLABORADORES */}
      <section>
        <h3>Gerenciamento de Colaboradores</h3>
        <form onSubmit={handleCadastrarColaborador}>
          <input
            placeholder="Nome"
            value={nomeColab}
            onChange={(e) => setNomeColab(e.target.value)}
            required
          />
          <input
            placeholder="E-mail"
            value={emailColab}
            onChange={(e) => setEmailColab(e.target.value)}
            required
          />
          <input
            placeholder="Cargo"
            value={cargoColab}
            onChange={(e) => setCargoColab(e.target.value)}
            required
          />
          <button type="submit">Cadastrar Colaborador</button>
        </form>

        <br />
        <input
          placeholder="Buscar colaborador..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <ul>
          {colaboradores.map((c) => (
            <li key={c.id}>
              {c.nome} - {c.email} ({c.cargo})
            </li>
          ))}
        </ul>
      </section>

      <hr />

      {/* CADASTRAR TAREFA */}
      <section>
        <h3>Cadastrar Nova Tarefa</h3>
        <form onSubmit={handleCadastrarTarefa}>
          <input
            placeholder="Título"
            value={tituloTarefa}
            onChange={(e) => setTituloTarefa(e.target.value)}
            required
          />
          <input
            placeholder="Descrição"
            value={descTarefa}
            onChange={(e) => setDescTarefa(e.target.value)}
            required
          />
          <select
            value={colabIdTarefa}
            onChange={(e) => setColabIdTarefa(e.target.value)}
            required
          >
            <option value="">Selecione um Colaborador</option>
            {colaboradores.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
          <button type="submit">Criar Tarefa</button>
        </form>
      </section>

      <hr />

      {/* AGENDAMENTOS E PRAZOS ORDENADOS */}
      <section>
        <h3>Agendamentos de Tarefas (Ordenado por Prazo)</h3>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Data Entrega</th>
              <th>Tarefa</th>
              <th>Descrição</th>
              <th>Colaborador</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((a) => (
              <tr key={a.id}>
                <td>{a.dataEntrega}</td>
                <td>{a.tarefa?.titulo}</td>
                <td>{a.tarefa?.descricao}</td>
                <td>{a.colaborador?.nome || "N/A"}</td>
                <td>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
