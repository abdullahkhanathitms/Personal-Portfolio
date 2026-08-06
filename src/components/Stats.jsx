import Reveal from './Reveal'
import { useCountUp } from '../hooks/useCountUp'
import { useGithubRepos } from '../hooks/useGithubRepos'

function StatCounter({ value, suffix = '', label }) {
  const [count, ref] = useCountUp(value)
  return (
    <div className="stat-counter" ref={ref}>
      <span className="stat-counter-value">{count}{suffix}</span>
      <span className="stat-counter-label">{label}</span>
    </div>
  )
}

export default function Stats() {
  const { repos } = useGithubRepos()

  const stats = [
    { value: 3, suffix: '+', label: 'Years Experience' },
    { value: 3, suffix: '', label: 'Industries Served' },
    { value: repos.length || 2, suffix: '+', label: 'Repositories Shipped' },
  ]

  return (
    <section id="stats" className="tight">
      <div className="container">
        <Reveal className="stats-grid">
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
