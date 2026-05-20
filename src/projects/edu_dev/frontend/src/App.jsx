import { useEffect, useState } from "react";
import "./App.css";

const CATEGORIA_COR = {
  Frontend: "cat-frontend",
  Backend: "cat-backend",
  Mobile: "cat-mobile",
  "Banco de Dados": "cat-db",
};

function App() {
  const [cursos, setCursos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [vagas, setVagas] = useState("");
  const [categoria, setCategoria] = useState("Frontend");
  const [editandoId, setEditandoId] = useState(null);

  const API = "http://localhost:3002/cursos";

  useEffect(() => {
    buscarCursos();
  }, []);

  async function buscarCursos() {
    const resposta = await fetch(API);
    const dados = await resposta.json();
    setCursos(dados);
  }

  async function enviarFormulario(e) {
    e.preventDefault();
    const curso = { titulo, vagas: Number(vagas), categoria };

    if (curso.vagas < 0) {
      alert("Vagas não podem ser negativas");
      return;
    }

    if (editandoId !== null) {
      await fetch(`${API}/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(curso),
      });
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(curso),
      });
    }

    limparFormulario();
    buscarCursos();
  }

  function editarCurso(curso) {
    setTitulo(curso.titulo);
    setVagas(curso.vagas);
    setCategoria(curso.categoria);
    setEditandoId(curso.id);
  }

  async function excluirCurso(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    buscarCursos();
  }

  function limparFormulario() {
    setTitulo("");
    setVagas("");
    setCategoria("Frontend");
    setEditandoId(null);
  }

  const totalCursos = cursos.length;
  const totalVagas = cursos.reduce((soma, c) => soma + Number(c.vagas), 0);

  return (
    <div className="container">
      <h1 className="page-title">
        Edu<span>Dev</span> — Sistema de Matrículas
      </h1>

      <div className="dashboard">
        <div className="card">
          <h2>Total de Cursos</h2>
          <p>{totalCursos}</p>
        </div>
        <div className="card">
          <h2>Total de Vagas</h2>
          <p>{totalVagas}</p>
        </div>
      </div>

      <form onSubmit={enviarFormulario} className="formulario">
        <input
          type="text"
          placeholder="Título do Curso"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Vagas"
          value={vagas}
          onChange={(e) => setVagas(e.target.value)}
          required
        />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Mobile">Mobile</option>
          <option value="Banco de Dados">Banco de Dados</option>
        </select>
        <button type="submit" className="btn-submit">
          {editandoId !== null ? "Salvar Alterações" : "Cadastrar Curso"}
        </button>
        {editandoId !== null && (
          <button type="button" className="btn-cancel" onClick={limparFormulario}>
            Cancelar
          </button>
        )}
      </form>

      <div className="lista">
        {cursos.map((curso) => (
          <div className="curso" key={curso.id}>
            <div className="curso-info">
              <h3>{curso.titulo}</h3>
              <p>{curso.vagas} vagas disponíveis</p>
            </div>
            <span className={`categoria-badge ${CATEGORIA_COR[curso.categoria] ?? ""}`}>
              {curso.categoria}
            </span>
            <div className="curso-acoes">
              <button className="btn-editar" onClick={() => editarCurso(curso)}>
                Editar
              </button>
              <button className="btn-excluir" onClick={() => excluirCurso(curso.id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
