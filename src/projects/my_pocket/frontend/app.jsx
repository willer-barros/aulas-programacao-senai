import { useState, useEffect } from 'react';

function App() {
  // Estados para a lista e para o formulário
  const [transacoes, setTransacoes] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('entrada');
  
  // Estado para controlar se estamos editando um item existente
  const [idEmEdicao, setIdEmEdicao] = useState(null);

  const API_URL = "http://localhost:3001/transacoes";

  // --- FUNÇÕES DE INTEGRAÇÃO (H5 e H6) ---

  // READ - Buscar todas as transações
  const carregarTransacoes = async () => {
    try {
      const resposta = await fetch(API_URL);
      const dados = await resposta.json();
      setTransacoes(dados);
    } catch (erro) {
      console.error("Erro ao buscar dados:", erro);
    }
  };

  useEffect(() => {
    carregarTransacoes();
  }, []);

  // CREATE (POST) & UPDATE (PUT)
  const salvarTransacao = async (e) => {
    e.preventDefault();

    const dadosTransacao = { 
      descricao, 
      valor: parseFloat(valor), 
      tipo 
    };

    try {
      if (idEmEdicao) {
        // Rota PUT: Atualizar existente
        await fetch(`${API_URL}/${idEmEdicao}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosTransacao)
        });
        setIdEmEdicao(null);
      } else {
        // Rota POST: Criar novo
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosTransacao)
        });
      }

      // Limpar formulário e recarregar lista
      setDescricao('');
      setValor('');
      carregarTransacoes();
    } catch (erro) {
      alert("Erro ao salvar transação");
    }
  };

  // DELETE - Remover transação
  const excluirTransacao = async (id) => {
    if (window.confirm("Deseja realmente excluir?")) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      carregarTransacoes();
    }
  };

  // Função para preencher o formulário para edição
  const prepararEdicao = (t) => {
    setIdEmEdicao(t.id);
    setDescricao(t.descricao);
    setValor(t.valor);
    setTipo(t.tipo);
  };

  // Cálculo de Saldo
  const saldoTotal = transacoes.reduce((acc, t) => {
    return t.tipo === 'entrada' ? acc + t.valor : acc - t.valor;
  }, 0);

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>🏦 MyPocket Financeiro</h1>
      
      <div style={{ 
        background: '#282c34', color: 'white', padding: '20px', 
        borderRadius: '10px', textAlign: 'center', marginBottom: '20px' 
      }}>
        <h2>Saldo: R$ {saldoTotal.toFixed(2)}</h2>
      </div>

      <form onSubmit={salvarTransacao} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          type="text" placeholder="Descrição" required
          value={descricao} onChange={e => setDescricao(e.target.value)} 
        />
        <input 
          type="number" placeholder="Valor" required
          value={valor} onChange={e => setValor(e.target.value)} 
        />
        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <button type="submit" style={{ cursor: 'pointer' }}>
          {idEmEdicao ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>

      <div className="lista">
        {transacoes.map(t => (
          <div key={t.id} style={{ 
            display: 'flex', justifyContent: 'space-between', 
            padding: '10px', borderBottom: '1px solid #ddd',
            alignItems: 'center'
          }}>
            <div>
              <strong>{t.descricao}</strong> <br />
              <small style={{ color: t.tipo === 'entrada' ? 'green' : 'red' }}>
                {t.tipo.toUpperCase()} - R$ {t.valor.toFixed(2)}
              </small>
            </div>
            <div>
              <button onClick={() => prepararEdicao(t)} style={{ marginRight: '5px' }}>Editar</button>
              <button onClick={() => excluirTransacao(t.id)} style={{ color: 'red' }}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;