import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:3002/cursos";

function App() {
  const [cursos, setCursos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [vagas, setVagas] = useState("");
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setCursos(data);
    } catch (e) {
      alert("Erro ao carregar cursos");
    } finally {
      setLoading(false);
    }
  }

  async function adicionar(e) {
    e.preventDefault();
    const vagasNum = Number(vagas);
    if (!titulo.trim()) return alert("Informe o título");
    if (!Number.isFinite(vagasNum) || vagasNum < 0) return alert("Vagas deve ser número >= 0");
    if (!categoria.trim()) return alert("Informe a categoria");

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, vagas: vagasNum, categoria }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erro no POST");
      }
      const novo = await res.json();
      setCursos((c) => [...c, novo]);
      setTitulo("");
      setVagas("");
      setCategoria("");
    } catch (err) {
      alert(err.message);
    }
  }

  async function remover(id) {
    if (!confirm("Confirma exclusão do curso?")) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erro ao excluir");
      }
      setCursos((c) => c.filter((x) => x.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  async function editar(curso) {
    const novoTitulo = prompt("Título:", curso.titulo);
    if (novoTitulo === null) return;
    const novoVagasText = prompt("Vagas:", String(curso.vagas));
    if (novoVagasText === null) return;
    const novoVagas = Number(novoVagasText);
    if (!Number.isFinite(novoVagas) || novoVagas < 0) return alert("Vagas deve ser número >= 0");
    const novaCategoria = prompt("Categoria:", curso.categoria);
    if (novaCategoria === null) return;

    try {
      const res = await fetch(`${API}/${curso.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: novoTitulo.trim(), vagas: novoVagas, categoria: novaCategoria.trim() }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erro ao atualizar");
      }
      const atualizado = await res.json();
      setCursos((c) => c.map((it) => (it.id === atualizado.id ? atualizado : it)));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="app">
      <h1>Gerenciador de Cursos</h1>

      <form onSubmit={adicionar} className="form">
        <input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <input placeholder="Vagas" value={vagas} onChange={(e) => setVagas(e.target.value)} />
        <input placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
        <button type="submit">Adicionar</button>
      </form>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="lista">
          {cursos.map((c) => (
            <li key={c.id} className="item">
              <div className="info">
                <strong>{c.titulo}</strong>
                <span>{c.categoria} • {c.vagas} vagas</span>
              </div>
              <div className="acoes">
                <button onClick={() => editar(c)}>Editar</button>
                <button onClick={() => remover(c.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
