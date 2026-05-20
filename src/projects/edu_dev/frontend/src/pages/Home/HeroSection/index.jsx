// ── src/pages/Home/HeroSection/index.jsx ────────────

import { useReveal } from '../../../hooks/useReveal'
import Button from '../../../components/Button'
import Container from '../../../components/Container'
import styles from './HeroSection.module.css'

const FEED_ITEMS = [
  { id: 1, initials: 'JM', name: 'João M.',    action: 'iniciou',             course: 'React & Hooks',  time: '2min' },
  { id: 2, initials: 'AS', name: 'Ana S.',     action: 'concluiu',            course: 'JavaScript',     time: '5min' },
  { id: 3, initials: 'PL', name: 'Pedro L.',   action: 'obteve certificado em', course: 'Node.js',      time: '8min' },
  { id: 4, initials: 'CM', name: 'Carla M.',   action: 'iniciou',             course: 'Python',         time: '12min' },
  { id: 5, initials: 'RS', name: 'Rafael S.',  action: 'concluiu',            course: 'DevOps',         time: '18min' },
  { id: 6, initials: 'LF', name: 'Lucas F.',   action: 'iniciou',             course: 'UI/UX Design',   time: '21min' },
]

function ActivityFeed() {
  return (
    <aside className={styles.feedCard} aria-label="Atividade recente na plataforma">
      <div className={styles.feedHeader}>
        <span className={styles.feedLive} aria-hidden />
        <span className={styles.feedTitle}>Atividade recente</span>
      </div>

      <div className={styles.feedMask}>
        <ul className={styles.feedList} role="list">
          {[...FEED_ITEMS, ...FEED_ITEMS].map((item, i) => (
            <li key={`${item.id}-${i}`} className={styles.feedItem}>
              <span className={styles.feedAvatar}>{item.initials}</span>
              <div className={styles.feedText}>
                <span className={styles.feedName}>{item.name}</span>
                {' '}<span className={styles.feedAction}>{item.action}</span>
                {' '}<span className={styles.feedCourse}>{item.course}</span>
              </div>
              <span className={styles.feedTime}>{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default function HeroSection() {
  const [headRef, headRevealed] = useReveal()
  const [subRef, subRevealed]   = useReveal({ delay: 100 })
  const [ctaRef, ctaRevealed]   = useReveal({ delay: 180 })

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>

          <div className={styles.content}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden />
              Plataforma educacional para devs
            </p>

            <h1
              ref={headRef}
              className={`${styles.headline} ${headRevealed ? styles.revealed : ''}`}
            >
              Construa sua<br />
              carreira em<br />
              <em className={styles.headlineEm}>tecnologia.</em>
            </h1>

            <p
              ref={subRef}
              className={`${styles.sub} ${subRevealed ? styles.revealed : ''}`}
            >
              Cursos práticos, trilhas estruturadas e projetos reais.
              Do primeiro commit até o deploy em produção.
            </p>

            <div
              ref={ctaRef}
              className={`${styles.cta} ${ctaRevealed ? styles.revealed : ''}`}
            >
              <Button variant="primary">Começar agora</Button>
              <Button variant="ghost">Ver trilhas</Button>
            </div>
          </div>

          <ActivityFeed />

        </div>
      </Container>
    </section>
  )
}
