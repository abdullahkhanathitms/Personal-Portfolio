import { SOCIALS } from '../data/socials'

const QUICK_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo">AK<span className="accent">.</span></span>
          <p>WordPress Developer &amp; Front-End Developer, based in Hyderabad, Pakistan.</p>
        </div>

        <ul className="footer-links-list">
          {QUICK_LINKS.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>

        <div className="footer-socials">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <i className={s.icon}></i>
            </a>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2026 Abdullah Khan. All rights reserved.</p>
      </div>
    </footer>
  )
}
