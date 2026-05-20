// ── src/components/Navbar/index.jsx ─────────────────

import { useScrolled } from '../../hooks/useScrolled'
import Button from '../Button'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Produto',  href: '#produto' },
  { label: 'Trilhas',  href: '#trilhas'  },
  { label: 'Cursos',   href: '#cursos'   },
  { label: 'Sobre',    href: '#sobre'    },
]

export default function Navbar() {
  const scrolled = useScrolled()

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>

        <a href="#" className={styles.logo} aria-label="edu_dev — início">
          <span className={styles.logoPulse} aria-hidden />
          <span>edu<span className={styles.logoAccent}>_dev</span></span>
        </a>

        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className={styles.link}>{label}</a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Button variant="ghost">Entrar</Button>
          <Button variant="primary">Começar grátis</Button>
        </div>

      </nav>
    </header>
  )
}
