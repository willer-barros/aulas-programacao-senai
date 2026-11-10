import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/api";

export default function App() {
  // Autenticação & Estado do Usuário
  const [usuario, setUsuario] = useState(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroLogin, setErroLogin] = useState("");

  // Listas de Dados
  const [clientes, setClientes] = useState([]);
  const [barbeiros, setBarbeiros] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);

  // Termo de Busca
  const [termoBusca, setTermoBusca] = useState("");

  // Formulários - Cliente
  const [nomeCliente, setNomeCliente] = useState("");
  const [telCliente, setTelCliente] = useState("");
  const [cpfCliente, setCpfCliente] = useState("");

  // Formulários - Barbeiro
  const [nomeBarbeiro, setNomeBarbeiro] = useState("");
  const [especialidade, setEspecialidade] = useState("");

  // Formulários - Serviço
  const [nomeServico, setNomeServico] = useState("");
  const [precoServico, setPrecoServico] = useState("");
  const [barbeiroIdServico, setBarbeiroIdServico] = useState("");

  // Formulários - Agendamento
  const [dataHorario, setDataHorario] = useState("");
  const [clienteIdAgendamento, setClienteIdAgendamento] = useState("");
  const [servicoIdAgendamento, setServicoIdAgendamento] = useState("");

  // 1. Verificar Sessão no Carregamento
  useEffect(() => {
    fetch(`${API_URL}/me`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((dados) => {
        if (dados) setUsuario(dados);
      });
  }, []);

  // 2. Carregar Dados do Sistema
  const carregarDados = () => {
    fetch(`${API_URL}/clientes?busca=${termoBusca}`, { credentials: "include" })
      .then((r) => r.json())
      .then(setClientes);

    fetch(`${API_URL}/barbeiros`, { credentials: "include" })
      .then((r) => r.json())
      .then(setBarbeiros);

    fetch(`${API_URL}/servicos`, { credentials: "include" })
      .then((r) => r.json())
      .then(setServicos);

    fetch(`${API_URL}/agendamentos`, { credentials: "include" })
      .then((r) => r.json())
      .then(setAgendamentos);
  };

  useEffect(() => {
    if (usuario) {
      carregarDados();
    }
  }, [usuario, termoBusca]);

  // Handler de Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErroLogin("");

    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, senha }),
    });

    const dados = await res.json();
    if (res.ok) {
      setUsuario(dados);
    } else {
      setErroLogin(dados.mensagem || "Falha ao autenticar.");
    }
  };

  // Handler de Logout
  const handleLogout = async () => {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUsuario(null);
  };

  // Cadastrar Cliente
  const handleCadastrarCliente = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/clientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        nome: nomeCliente,
        telefone: telCliente,
        cpf: cpfCliente,
      }),
    });
    setNomeCliente("");
    setTelCliente("");
    setCpfCliente("");
    carregarDados();
  };

  // Cadastrar Barbeiro
  const handleCadastrarBarbeiro = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/barbeiros`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ nome: nomeBarbeiro, especialidade }),
    });
    setNomeBarbeiro("");
    setEspecialidade("");
    carregarDados();
  };

  // Cadastrar Serviço vinculado ao Barbeiro
  const handleCadastrarServico = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/servicos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        nome: nomeServico,
        preco: precoServico,
        barbeiroId: barbeiroIdServico,
      }),
    });
    setNomeServico("");
    setPrecoServico("");
    setBarbeiroIdServico("");
    carregarDados();
  };

  // Cadastrar Agendamento
  const handleCadastrarAgendamento = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/agendamentos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        dataHorario,
        clienteId: clienteIdAgendamento,
        servicoId: servicoIdAgendamento,
      }),
    });
    setDataHorario("");
    setClienteIdAgendamento("");
    setServicoIdAgendamento("");
    carregarDados();
  };

  // TELA DE LOGIN
  if (!usuario) {
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h2>BarberControl — Login</h2>
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

  // PAINEL PRINCIPAL DO SYSTEM
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {/* 1. CABEÇALHO DO PAINEL PRINCIPAL */}
      <header>
        <h2>BarberControl — Painel Principal</h2>
        <p>
          Usuário Logado: <strong>{usuario.nome}</strong> ({usuario.cargo})
        </p>
        <button onClick={handleLogout}>Sair (Logout)</button>
      </header>

      <hr />

      {/* 2. GERENCIAMENTO DE CLIENTES */}
      <section>
        <h3>Gerenciamento de Clientes</h3>
        <form onSubmit={handleCadastrarCliente}>
          <input
            placeholder="Nome"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            required
          />
          <input
            placeholder="Telefone"
            value={telCliente}
            onChange={(e) => setTelCliente(e.target.value)}
            required
          />
          <input
            placeholder="CPF (Dado Sensível)"
            value={cpfCliente}
            onChange={(e) => setCpfCliente(e.target.value)}
            required
          />
          <button type="submit">Cadastrar Cliente</button>
        </form>

        <br />
        <input
          placeholder="Buscar cliente por nome..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />

        <ul>
          {clientes.map((c) => (
            <li key={c.id}>
              {c.nome} - Tel: {c.telefone} (CPF Criptografado no Banco)
            </li>
          ))}
        </ul>
      </section>

      <hr />

      {/* 3. GERENCIAMENTO DE BARBEIROS E SERVIÇOS */}
      <section>
        <h3>Cadastrar Barbeiro</h3>
        <form onSubmit={handleCadastrarBarbeiro}>
          <input
            placeholder="Nome Barbeiro"
            value={nomeBarbeiro}
            onChange={(e) => setNomeBarbeiro(e.target.value)}
            required
          />
          <input
            placeholder="Especialidade"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            required
          />
          <button type="submit">Cadastrar Barbeiro</button>
        </form>

        <h3>Cadastrar Serviço (Vínculo com Barbeiro)</h3>
        <form onSubmit={handleCadastrarServico}>
          <input
            placeholder="Nome do Serviço"
            value={nomeServico}
            onChange={(e) => setNomeServico(e.target.value)}
            required
          />
          <input
            placeholder="Preço (R$)"
            type="number"
            step="0.01"
            value={precoServico}
            onChange={(e) => setPrecoServico(e.target.value)}
            required
          />
          <select
            value={barbeiroIdServico}
            onChange={(e) => setBarbeiroIdServico(e.target.value)}
            required
          >
            <option value="">Selecione o Barbeiro Responsável</option>
            {barbeiros.map((b) => (
              <option key={b.id} value={b.id}>
                {b.nome} ({b.especialidade})
              </option>
            ))}
          </select>
          <button type="submit">Cadastrar Serviço</button>
        </form>
      </section>

      <hr />

      {/* 4. AGENDAMENTOS E HORÁRIOS */}
      <section>
        <h3>Novo Agendamento</h3>
        <form onSubmit={handleCadastrarAgendamento}>
          <p>
            Data e Horário:{" "}
            <input
              type="datetime-local"
              value={dataHorario}
              onChange={(e) => setDataHorario(e.target.value)}
              required
            />
          </p>
          <p>
            Cliente:{" "}
            <select
              value={clienteIdAgendamento}
              onChange={(e) => setClienteIdAgendamento(e.target.value)}
              required
            >
              <option value="">Selecione o Cliente</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </p>
          <p>
            Serviço:{" "}
            <select
              value={servicoIdAgendamento}
              onChange={(e) => setServicoIdAgendamento(e.target.value)}
              required
            >
              <option value="">Selecione o Serviço</option>
              {servicos.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nome} - R$ {s.preco} (Barbeiro: {s.barbeiro?.nome})
                </option>
              ))}
            </select>
          </p>
          <button type="submit">Confirmar Agendamento</button>
        </form>

        <h3>Agendamentos Marcados (Ordenados por Dia e Horário)</h3>
        <table border="1" cellPadding="6" cellSpacing="0">
          <thead>
            <tr>
              <th>Data / Hora</th>
              <th>Cliente</th>
              <th>Telefone</th>
              <th>Serviço</th>
              <th>Preço</th>
              <th>Barbeiro Designado</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((a) => (
              <tr key={a.id}>
                <td>{new Date(a.dataHorario).toLocaleString("pt-BR")}</td>
                <td>{a.cliente?.nome}</td>
                <td>{a.cliente?.telefone}</td>
                <td>{a.servico?.nome}</td>
                <td>R$ {a.servico?.preco.toFixed(2)}</td>
                <td>{a.servico?.barbeiro?.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
