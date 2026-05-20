import React, { useEffect, useState } from 'react';

export default function ComandoFront() {
  const [cursos, setCursos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [vagas, setVagas] = useState('');
  const [categoria, setCategoria] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const API = 'http://localhost:3002/cursos';

  useEffect(() => {
    fetchCursos();
  }, []);

  async function fetchCursos() {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setCursos(data);
    } catch (err) {
      console.error('Erro ao buscar cursos', err);
    }
  }

  function resetForm() {
    setTitulo('');
    setVagas('');
    setCategoria('');
    setEditingId(null);
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const vagasNum = Number(vagas);

    if (!titulo.trim() || !categoria.trim()) {
      setError('Preencha título e categoria.');
      return;
    }
    if (!Number.isFinite(vagasNum) || Number.isNaN(vagasNum)) {
      setError('Campo vagas deve ser um número.');
      return;
    }
    if (vagasNum < 0) {
      setError('O número de vagas não pode ser negativo.');
      return;
    }

    const payload = { titulo: titulo.trim(), vagas: vagasNum, categoria: categoria.trim() };

    try {
      if (editingId) {
        const res = await fetch(`${API}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          const err = await res.json();
          setError(err.erro || 'Erro ao atualizar curso.');
          return;
        }
      } else {
        const res = await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          const err = await res.json();
          setError(err.erro || 'Erro ao criar curso.');
          return;
        }
      }
      await fetchCursos();
      resetForm();
    } catch (err) {
      console.error(err);
      setError('Erro de rede.');
    }
  }

  function handleEdit(curso) {
    setTitulo(curso.titulo);
    setVagas(String(curso.vagas));
    setCategoria(curso.categoria);
    setEditingId(curso.id);
    setError('');
  }

  async function handleDelete(id) {
    if (!confirm('Confirma exclusão deste curso?')) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        alert(err.erro || 'Erro ao excluir.');
        return;
      }
      await fetchCursos();
    } catch (err) {
      console.error(err);
      alert('Erro de rede.');
    }
  }

  const totalCursos = cursos.length;
  const totalVagas = cursos.reduce((s, c) => s + Number(c.vagas || 0), 0);
  const submitLabel = editingId ? 'Salvar Alterações' : 'Cadastrar Curso';

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Gerenciador de Cursos</h1>

      <section style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        <div style={{ padding: 12, border: '1px solid #ccc', borderRadius: 6, minWidth: 180 }}>
          <strong>Total de Cursos</strong>
          <div style={{ fontSize: 24 }}>{totalCursos}</div>
        </div>
        <div style={{ padding: 12, border: '1px solid #ccc', borderRadius: 6, minWidth: 180 }}>
          <strong>Total de Vagas</strong>
          <div style={{ fontSize: 24 }}>{totalVagas}</div>
        </div>
      </section>

      <section style={{ marginBottom: 20 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Título</label>
            <input value={titulo} onChange={e => setTitulo(e.target.value)} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Vagas</label>
            <input type="number" min="0" value={vagas} onChange={e => setVagas(e.target.value)} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Categoria</label>
            <input value={categoria} onChange={e => setCategoria(e.target.value)} />
          </div>
          <button type="submit" style={{ height: 32 }}>{submitLabel}</button>
          <button type="button" onClick={resetForm} style={{ height: 32 }}>Limpar</button>
        </form>
        {error && <div style={{ color: 'crimson', marginTop: 8 }}>{error}</div>}
      </section>

      <section>
        <h2>Cursos</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {cursos.map(curso => (
            <div key={curso.id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{curso.titulo}</div>
                <div>Vagas: {curso.vagas}</div>
                <div>Categoria: {curso.categoria}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => handleEdit(curso)}>Editar</button>
                <button onClick={() => handleDelete(curso.id)}>Excluir</button>
              </div>
            </div>
          ))}
          {cursos.length === 0 && <div>Nenhum curso cadastrado.</div>}
        </div>
      </section>
    </div>
  );
}