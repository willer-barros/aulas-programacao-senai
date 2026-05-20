import { useState, useEffect } from "react";

const API_URL = "http://localhost:3002/cursos";

const categoryColors = {
  Frontend: { bg: "#dbeafe", text: "#1d4ed8", border: "#93c5fd" },
  Backend: { bg: "#dcfce7", text: "#15803d", border: "#86efac" },
  Design: { bg: "#fae8ff", text: "#9333ea", border: "#d8b4fe" },
  "Full Stack": { bg: "#fff7ed", text: "#c2410c", border: "#fdba74" },
  DevOps: { bg: "#fef9c3", text: "#854d0e", border: "#fde047" },
  Mobile: { bg: "#ffe4e6", text: "#be123c", border: "#fda4af" },
};

const getCategoryStyle = (cat) =>
  categoryColors[cat] || { bg: "#f1f5f9", text: "#475569", border: "#cbd5e1" };

export default function App() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // Form state
  const [form, setForm] = useState({ titulo: "", vagas: "", categoria: "" });
  const [editandoId, setEditandoId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchCursos = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setCursos(data);
    } catch {
      setErro("Não foi possível conectar ao servidor. Verifique se ele está rodando na porta 3002.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const showSucesso = (msg) => {
    setSucesso(msg);
    setTimeout(() => setSucesso(""), 3000);
  };

  const showErro = (msg) => {
    setErro(msg);
    setTimeout(() => setErro(""), 4000);
  };

  const handleSubmit = async () => {
    if (!form.titulo.trim() || !form.vagas || !form.categoria.trim()) {
      showErro("Preencha todos os campos antes de continuar.");
      return;
    }
    setSubmitting(true);
    try {
      const method = editandoId ? "PUT" : "POST";
      const url = editandoId ? `${API_URL}/${editandoId}` : API_URL;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, vagas: Number(form.vagas) }),
      });
      const data = await res.json();
      if (!res.ok) {
        showErro(data.erro || "Erro ao salvar curso.");
        return;
      }
      await fetchCursos();
      setForm({ titulo: "", vagas: "", categoria: "" });
      setEditandoId(null);
      showSucesso(editandoId ? "Curso atualizado com sucesso!" : "Curso cadastrado com sucesso!");
    } catch {
      showErro("Erro de conexão com o servidor.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditar = (curso) => {
    setForm({ titulo: curso.titulo, vagas: curso.vagas, categoria: curso.categoria });
    setEditandoId(curso.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExcluir = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) { showErro("Erro ao excluir curso."); return; }
      setCursos((prev) => prev.filter((c) => c.id !== id));
      if (editandoId === id) {
        setEditandoId(null);
        setForm({ titulo: "", vagas: "", categoria: "" });
      }
      showSucesso("Curso excluído com sucesso!");
    } catch {
      showErro("Erro de conexão com o servidor.");
    }
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setForm({ titulo: "", vagas: "", categoria: "" });
  };

  const totalVagas = cursos.reduce((acc, c) => acc + c.vagas, 0);

  return (
    <div style={styles.root}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>🎓</span>
            <div>
              <div style={styles.logoTitle}>EduManager</div>
              <div style={styles.logoSub}>Gestão de Cursos</div>
            </div>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        {/* Toast notifications */}
        {sucesso && <div style={{ ...styles.toast, ...styles.toastSucesso }}>{sucesso}</div>}
        {erro && !loading && <div style={{ ...styles.toast, ...styles.toastErro }}>{erro}</div>}

        {/* Dashboard */}
        <section style={styles.dashRow}>
          <div style={{ ...styles.card, ...styles.dashCard }}>
            <div style={styles.dashIcon}>📚</div>
            <div>
              <div style={styles.dashLabel}>Total de Cursos</div>
              <div style={styles.dashNum}>{cursos.length}</div>
            </div>
          </div>
          <div style={{ ...styles.card, ...styles.dashCard }}>
            <div style={styles.dashIcon}>🪑</div>
            <div>
              <div style={styles.dashLabel}>Soma de Vagas</div>
              <div style={styles.dashNum}>{totalVagas}</div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>
            {editandoId ? "✏️ Modo de Edição" : "➕ Novo Curso"}
          </h2>
          {editandoId && (
            <p style={styles.editBadge}>Editando o curso <strong>#{editandoId}</strong></p>
          )}
          <div style={styles.formGrid}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Título do Curso</label>
              <input
                style={styles.input}
                placeholder="Ex: React do Zero ao Avançado"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Número de Vagas</label>
              <input
                style={styles.input}
                type="number"
                min="0"
                placeholder="Ex: 30"
                value={form.vagas}
                onChange={(e) => setForm({ ...form, vagas: e.target.value })}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Categoria</label>
              <select
                style={styles.input}
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              >
                <option value="">Selecione...</option>
                {["Frontend", "Backend", "Design", "Full Stack", "DevOps", "Mobile"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={styles.formActions}>
            <button
              style={{ ...styles.btn, ...styles.btnPrimary, ...(submitting ? styles.btnDisabled : {}) }}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Salvando..." : editandoId ? "💾 Salvar Alterações" : "✅ Cadastrar Curso"}
            </button>
            {editandoId && (
              <button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={handleCancelar}>
                Cancelar
              </button>
            )}
          </div>
        </section>

        {/* Courses list */}
        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>📋 Cursos Cadastrados</h2>
          {loading ? (
            <div style={styles.emptyState}>
              <div style={styles.spinner} />
              <p>Carregando cursos...</p>
            </div>
          ) : cursos.length === 0 ? (
            <div style={styles.emptyState}>
              <span style={{ fontSize: 48 }}>📭</span>
              <p style={{ color: "#94a3b8", marginTop: 8 }}>Nenhum curso cadastrado ainda.</p>
            </div>
          ) : (
            <div style={styles.courseGrid}>
              {cursos.map((curso) => {
                const cat = getCategoryStyle(curso.categoria);
                const isEditing = editandoId === curso.id;
                return (
                  <div
                    key={curso.id}
                    style={{
                      ...styles.courseCard,
                      ...(isEditing ? styles.courseCardEditing : {}),
                    }}
                  >
                    <div style={styles.courseTop}>
                      <span
                        style={{
                          ...styles.catBadge,
                          background: cat.bg,
                          color: cat.text,
                          border: `1px solid ${cat.border}`,
                        }}
                      >
                        {curso.categoria}
                      </span>
                      <span style={styles.courseId}>#{curso.id}</span>
                    </div>
                    <h3 style={styles.courseTitle}>{curso.titulo}</h3>
                    <div style={styles.vagasRow}>
                      <span style={styles.vagasIcon}>🪑</span>
                      <span style={styles.vagasText}>
                        <strong>{curso.vagas}</strong> vagas disponíveis
                      </span>
                    </div>
                    <div style={styles.courseActions}>
                      <button
                        style={{ ...styles.btn, ...styles.btnEdit }}
                        onClick={() => handleEditar(curso)}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        style={{ ...styles.btn, ...styles.btnDelete }}
                        onClick={() => handleExcluir(curso.id)}
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <footer style={styles.footer}>
        <p>EduManager · API rodando em <code>http://localhost:3002</code></p>
      </footer>
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    background: "#f8fafc",
    minHeight: "100vh",
    color: "#1e293b",
  },
  header: {
    background: "#1e293b",
    padding: "0 24px",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
  headerInner: {
    maxWidth: 900,
    margin: "0 auto",
    height: 64,
    display: "flex",
    alignItems: "center",
  },
  logo: { display: "flex", alignItems: "center", gap: 12 },
  logoIcon: { fontSize: 28 },
  logoTitle: { fontSize: 18, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.3px" },
  logoSub: { fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" },
  main: { maxWidth: 900, margin: "0 auto", padding: "28px 16px 48px" },
  toast: {
    position: "fixed",
    top: 80,
    right: 24,
    padding: "12px 20px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
    zIndex: 200,
    animation: "fadeIn 0.3s ease",
  },
  toastSucesso: { background: "#dcfce7", color: "#166534", border: "1px solid #86efac" },
  toastErro: { background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5" },
  dashRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginBottom: 20,
    background: "none",
    boxShadow: "none",
    padding: 0,
  },
  card: {
    background: "#ffffff",
    borderRadius: 14,
    padding: "24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)",
    marginBottom: 20,
    border: "1px solid #e2e8f0",
  },
  dashCard: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    padding: "22px 24px",
    marginBottom: 0,
  },
  dashIcon: { fontSize: 36 },
  dashLabel: { fontSize: 12, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" },
  dashNum: { fontSize: 36, fontWeight: 800, color: "#1e293b", lineHeight: 1.1, marginTop: 2 },
  sectionTitle: { fontSize: 17, fontWeight: 700, margin: "0 0 18px", color: "#1e293b" },
  editBadge: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    color: "#1d4ed8",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 13,
    marginBottom: 16,
    marginTop: -8,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gap: 14,
    marginBottom: 18,
  },
  fieldGroup: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.4px" },
  input: {
    padding: "10px 14px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 9,
    fontSize: 14,
    color: "#1e293b",
    outline: "none",
    background: "#f8fafc",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  },
  formActions: { display: "flex", gap: 10 },
  btn: {
    padding: "10px 20px",
    borderRadius: 9,
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    transition: "all 0.15s",
    fontFamily: "inherit",
  },
  btnPrimary: { background: "#1e293b", color: "#f1f5f9" },
  btnDisabled: { opacity: 0.6, cursor: "not-allowed" },
  btnSecondary: { background: "#f1f5f9", color: "#64748b", border: "1px solid #e2e8f0" },
  btnEdit: { background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", flex: 1 },
  btnDelete: { background: "#fff1f2", color: "#be123c", border: "1px solid #fecdd3", flex: 1 },
  courseGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 },
  courseCard: {
    background: "#f8fafc",
    border: "1.5px solid #e2e8f0",
    borderRadius: 12,
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    transition: "box-shadow 0.2s",
  },
  courseCardEditing: {
    border: "1.5px solid #93c5fd",
    background: "#f0f7ff",
    boxShadow: "0 0 0 3px rgba(147,197,253,0.2)",
  },
  courseTop: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  catBadge: { fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, letterSpacing: "0.3px" },
  courseId: { fontSize: 11, color: "#cbd5e1", fontWeight: 500 },
  courseTitle: { fontSize: 15, fontWeight: 700, color: "#1e293b", margin: 0, lineHeight: 1.4 },
  vagasRow: { display: "flex", alignItems: "center", gap: 6 },
  vagasIcon: { fontSize: 16 },
  vagasText: { fontSize: 13, color: "#64748b" },
  courseActions: { display: "flex", gap: 8, marginTop: 4 },
  emptyState: { textAlign: "center", padding: "40px 0", color: "#64748b" },
  spinner: {
    width: 32,
    height: 32,
    border: "3px solid #e2e8f0",
    borderTop: "3px solid #1e293b",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    margin: "0 auto 12px",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    color: "#94a3b8",
    fontSize: 13,
    borderTop: "1px solid #e2e8f0",
    background: "#fff",
  },
};