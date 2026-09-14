import { useState } from 'react'
import './App.css'

const jogadoresIniciais = [
  { id: 1, nome: "Mbappé", votos: 0 },
  { id: 2, nome: "Lamine Yamal", votos: 0 },
  { id: 3, nome: "Dembélé", votos: 0 },
]

function App() {
  const [jogadores, setJogadores] = useState(jogadoresIniciais)

  function votar(id) {
    setJogadores(jogadores.map(jogador =>
      jogador.id === id
        ? { ...jogador, votos: jogador.votos + 1 }
        : jogador
    ))
  }

  const maiorVoto = Math.max(...jogadores.map(j => j.votos))
  const listaJogadores = jogadores.map(jogador =>
    <li key={jogador.id} className={`jogador-item ${jogador.votos === maiorVoto && jogador.votos > 0 ? "lider" : ""}`}
  >
      <span className="nome">{jogador.nome}</span>
      <span className="votos">{jogador.votos} votos</span>
      <button onClick={() => votar(jogador.id)}>Votar</button>
    </li>
  )


  return (
    <>
      <h1>Quem vai ser o melhor do mundo?</h1>
      <ul className="lista-jogadores">{listaJogadores}</ul>
    </>
  )
}

export default App