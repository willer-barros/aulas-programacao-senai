// ── src/pages/Home/index.jsx ─────────────────────────

import HeroSection   from './HeroSection'
import StatsSection  from './StatsSection'
import TrilhasSection from './TrilhasSection'
import CursosSection from './CursosSection'
import CtaSection    from './CtaSection'
import styles        from './Home.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <StatsSection />
      <TrilhasSection />
      <CursosSection />
      <CtaSection />
      <footer className={styles.footer}>
        <span className={styles.footerLogo}>
          edu<span className={styles.footerAccent}>_dev</span>
        </span>
        <nav className={styles.footerLinks} aria-label="Links do rodapé">
          <a href="#">Privacidade</a>
          <a href="#">Termos</a>
          <a href="#">Contato</a>
        </nav>
        <p className={styles.footerCopy}>© 2025 edu_dev</p>
      </footer>
    </main>
  )
}
