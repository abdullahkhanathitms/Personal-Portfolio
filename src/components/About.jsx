import Reveal from './Reveal'

const QUICK_INFO = [
  { icon: 'fa-solid fa-location-dot', label: 'Hyderabad, Pakistan' },
  { icon: 'fa-solid fa-phone', label: '+92 370 0158852' },
  { icon: 'fa-solid fa-envelope', label: 'abdullahkhan824779@gmail.com' },
  { icon: 'fa-brands fa-github', label: 'GitHub Profile', href: 'https://github.com/abdullahkhanathitms' },
]

const HIGHLIGHTS = [
  {
    icon: 'fa-solid fa-code',
    title: 'Full-Stack Development',
    text: 'Building end-to-end web apps with React, Node.js, Express, MongoDB and PHP — clean API architecture and scalable backends.',
  },
  {
    icon: 'fa-brands fa-webflow',
    title: 'Webflow & WordPress CMS',
    text: 'Custom WordPress and Webflow builds with Elementor Pro and WooCommerce — design-forward, responsive marketing sites.',
  },
  {
    icon: 'fa-solid fa-gauge-high',
    title: 'Performance & SEO',
    text: 'Tuning page speed, technical SEO fundamentals and site security so web platforms load blazingly fast from day one.',
  },
]

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-copy">
            <div className="eyebrow">About Me</div>
            <h2>
              Building websites that<br />look sharp and <span className="text-gradient">load fast</span>.
            </h2>
            <p className="about-bio">
              I'm a results-driven Full-Stack &amp; CMS Developer with over 3 years of professional
              experience delivering responsive, high-performance web applications and websites from inside a software house
              environment. My expertise spans custom full-stack solutions built with React, Node.js, Express,
              MongoDB and PHP, alongside high-converting WordPress and Webflow platforms. I focus on clean architecture,
              scalable backends, fast load times, and intuitive user experiences.
            </p>

            <ul className="quick-info">
              {QUICK_INFO.map((info) => (
                <li key={info.label}>
                  <i className={info.icon}></i>
                  {info.href ? (
                    <a href={info.href} target="_blank" rel="noopener noreferrer">{info.label}</a>
                  ) : (
                    <span>{info.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="about-highlights">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.1} className="highlight-card glass">
                <div className="highlight-icon">
                  <i className={h.icon}></i>
                </div>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
