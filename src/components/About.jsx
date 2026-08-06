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
    title: 'Front-End Development',
    text: 'Building responsive, cross-browser interfaces with HTML5, CSS3, Bootstrap and JavaScript, with React for interactive experiences.',
  },
  {
    icon: 'fa-brands fa-wordpress',
    title: 'WordPress & CMS',
    text: 'Custom WordPress builds with Elementor Pro and WooCommerce — from storefronts to lead-generation landing pages.',
  },
  {
    icon: 'fa-solid fa-gauge-high',
    title: 'Performance & SEO',
    text: 'Tuning page speed, on-page SEO fundamentals and site maintenance so websites load fast and rank well from day one.',
  },
]

export default function About() {
  return (
    <section id="about">
      <div className="container about-grid">
        <Reveal className="about-copy">
          <div className="eyebrow">About Me</div>
          <h2>
            Building websites that<br />look sharp and <span className="text-gradient">load fast</span>.
          </h2>
          <p className="about-bio">
            I'm a results-driven WordPress and Front-End Developer with over 3 years of professional
            experience delivering responsive, high-performance websites from inside a software house
            environment. My work spans real estate platforms, eCommerce storefronts and corporate
            sites — built with Elementor Pro, WooCommerce and hand-written HTML, CSS and JavaScript,
            with growing experience across Framer, Shopify and Webflow. I care about clean code,
            fast load times and websites that are genuinely easy to use.
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
    </section>
  )
}
