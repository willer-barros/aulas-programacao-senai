// ── src/main.jsx ─────────────────────────────────────

import { StrictMode }  from 'react'
import { createRoot }  from 'react-dom/client'
import './styles/tokens.css'
import './styles/global.css'
import Navbar from './components/Navbar'
import Home   from './pages/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Home />
  </StrictMode>,
)
