import Reveal from './Reveal'
import IdCard from './IdCard'

const QUICK_INFO = [
  { icon: 'fa-solid fa-location-dot', label: 'Hyderabad, Pakistan' },
  { icon: 'fa-solid fa-phone', label: '+92 370 0158852', href: 'tel:+923700158852' },
  { icon: 'fa-solid fa-envelope', label: 'abdullahkhan824779@gmail.com', href: 'mailto:abdullahkhan824779@gmail.com' },
  { icon: 'fa-brands fa-github', label: 'GitHub Profile', href: 'https://github.com/abdullahkhanathitms' },
]

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid-enhanced">
          {/* Left Column: Bio & Metadata */}
          <Reveal className="about-copy-enhanced">
            <div className="eyebrow">
              <span className="eyebrow-dash"></span> ABOUT ME
            </div>

            <h2>
              Building websites that<br />
              look sharp and <span className="text-highlight-orange">load fast.</span>
            </h2>

            <p className="about-bio">
              I'm a results-driven Full-Stack &amp; CMS Developer with over 3 years of professional
              experience delivering responsive, high-performance web applications and websites from inside a software house
              environment. My expertise spans custom full-stack solutions built with React, Node.js, Express,
              MongoDB and PHP, alongside high-converting WordPress and Webflow platforms. I focus on clean architecture,
              scalable backends, fast load times, and intuitive user experiences.
            </p>

            <ul className="quick-info-enhanced">
              {QUICK_INFO.map((info) => (
                <li key={info.label} className="quick-info-item">
                  <span className="quick-info-icon">
                    <i className={info.icon}></i>
                  </span>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="quick-info-link"
                    >
                      {info.label}
                    </a>
                  ) : (
                    <span className="quick-info-text">{info.label}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="about-cta-row">
              <a href="/resume.pdf" download className="btn btn-primary about-cv-btn">
                <i className="fa-solid fa-paper-plane"></i>
                <span>Download CV</span>
              </a>
              <a href="#contact" className="about-talk-link">
                <span>Let's Talk</span>
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </Reveal>

          {/* Right Column: Hanging Lanyard ID Badge Card */}
          <Reveal delay={0.15} className="about-id-column">
            <IdCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

