import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import { useGithubRepos } from '../hooks/useGithubRepos'
import { GITHUB_USER } from '../data/socials'
import { PERSONAL_PORTFOLIO, CERTIFICATES } from '../data/showcase'

// Real client work — these are live production sites built at Brixq Software
// House rather than public repos, so they're curated here with proper writeups.
const FEATURED_PROJECTS = [
  {
    id: 'featured-real-estate',
    name: 'Singapore Real Estate Websites',
    description:
      'A set of property-listing websites built for the Singapore real estate market — structured listing pages, lead-capture forms and dedicated landing pages designed around one goal: turning visitors into qualified enquiries.',
    tags: ['WordPress', 'Elementor Pro', 'Lead Generation'],
    liveUrl: 'https://savewithproperty.sg',
    icon: 'fa-solid fa-house-chimney',
  },
  {
    id: 'featured-ecommerce',
    name: 'The Soul Project — eCommerce Store',
    description:
      'A WooCommerce and Shopify-powered storefront for a Kuwait-based eCommerce brand, covering product management, secure payment integration and a fully responsive shopping experience.',
    tags: ['WooCommerce', 'Shopify', 'eCommerce'],
    liveUrl: 'https://thesoulprojectkw.com',
    icon: 'fa-solid fa-cart-shopping',
  },
  {
    id: 'featured-corporate',
    name: 'Peshawar Zalmi — Corporate Website',
    description:
      'A performance-focused corporate website built with WordPress and Framer, balancing a strong brand identity with fast load times and a consistent experience across every device.',
    tags: ['WordPress', 'Framer', 'Corporate'],
    liveUrl: 'https://peshawarzalmi.com',
    icon: 'fa-solid fa-building',
  },
]

// Fallback descriptions for repos that ship without one on GitHub.
const REPO_DESCRIPTIONS = {
  Team_Python: 'A collaborative Python project focused on applying core programming logic through team-based problem solving.',
  'ids-interview-platform': 'A front-end interview-platform interface built with structured, maintainable CSS for a clean, usable layout.',
}

const TABS = [
  { id: 'projects', label: 'Projects', icon: 'fa-solid fa-diagram-project' },
  { id: 'portfolio', label: 'Personal Portfolio', icon: 'fa-brands fa-wordpress' },
  { id: 'certificates', label: 'Certificates', icon: 'fa-solid fa-certificate' },
]

function getLangIcon(lang) {
  const map = {
    JavaScript: 'fa-brands fa-js',
    HTML: 'fa-brands fa-html5',
    CSS: 'fa-brands fa-css3-alt',
    TypeScript: 'fa-solid fa-code',
    Python: 'fa-brands fa-python',
    'C#': 'fa-solid fa-code',
  }
  return map[lang] || 'fa-solid fa-folder'
}

function getLangClass(lang) {
  const map = { JavaScript: 'js-lang', HTML: 'html-lang', CSS: 'css-lang', TypeScript: 'ts-lang' }
  return map[lang] || ''
}

function formatRepoName(name) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const panelMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
}

function ProjectsPanel() {
  const { repos, error } = useGithubRepos()

  return (
    <motion.div {...panelMotion}>
      <div className="projects-grid">
        {FEATURED_PROJECTS.map((project, i) => (
          <Reveal
            key={project.id}
            delay={(i % 6) * 0.06}
            className="project-card glass featured"
          >
            <div className="project-card-top">
              <div className="project-icon"><i className={project.icon}></i></div>
              <span className="project-featured-tag"><i className="fa-solid fa-star"></i> Featured</span>
            </div>

            <h3>{project.name}</h3>
            <p>{project.description}</p>

            <div className="repo-meta">
              {project.tags.map((tag) => (
                <span className="repo-lang" key={tag}>{tag}</span>
              ))}
            </div>

            <div className="project-actions">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link primary">
                Live Site <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </Reveal>
        ))}

        {!error && repos.map((repo, i) => {
          const lang = repo.language || 'Unknown'
          const description = repo.description || REPO_DESCRIPTIONS[repo.name] || 'A project from my public GitHub repositories.'

          return (
            <Reveal
              key={repo.id}
              delay={((FEATURED_PROJECTS.length + i) % 6) * 0.06}
              className="project-card glass"
            >
              <div className="project-card-top">
                <div className="project-icon"><i className={getLangIcon(lang)}></i></div>
              </div>

              <h3>{formatRepoName(repo.name)}</h3>
              <p>{description}</p>

              <div className="repo-meta">
                <span className={`repo-lang ${getLangClass(lang)}`}>{lang}</span>
                {repo.stargazers_count > 0 && (
                  <span className="repo-stars"><i className="fa-solid fa-star"></i> {repo.stargazers_count}</span>
                )}
              </div>

              <div className="project-actions">
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="project-link primary">
                    Live Demo <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                )}
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="project-link">
                  <i className="fa-brands fa-github"></i> Code
                </a>
              </div>
            </Reveal>
          )
        })}
      </div>

      {error && (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0 2rem' }}>
          Couldn't load additional GitHub repositories right now — please check back shortly.
        </p>
      )}

      <div className="github-cta">
        <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          <i className="fa-brands fa-github"></i> View All on GitHub
        </a>
      </div>
    </motion.div>
  )
}

function PortfolioPanel() {
  const p = PERSONAL_PORTFOLIO

  return (
    <motion.div {...panelMotion} className="portfolio-panel">
      <div className="portfolio-card glass">
        <div className="portfolio-preview">
          {p.image ? (
            <img src={p.image} alt={p.name} />
          ) : (
            <div className="portfolio-preview-placeholder">
              <i className="fa-brands fa-wordpress"></i>
              <span>Add a screenshot of your site here</span>
            </div>
          )}
          <div className="portfolio-browser-bar">
            <span></span><span></span><span></span>
          </div>
        </div>

        <div className="portfolio-info">
          <h3>{p.name}</h3>
          <p>{p.description}</p>

          <div className="repo-meta">
            {p.tags.map((tag) => (
              <span className="repo-lang" key={tag}>{tag}</span>
            ))}
          </div>

          <div className="project-actions">
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link primary">
              Visit Site <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CertificatesPanel() {
  return (
    <motion.div {...panelMotion}>
      <div className="certificates-grid">
        {CERTIFICATES.map((cert, i) => (
          <Reveal key={cert.id} delay={i * 0.08} className="certificate-card glass">
            <div className="certificate-badge">
              {cert.image ? (
                <img src={cert.image} alt={cert.title} />
              ) : (
                <i className="fa-brands fa-microsoft"></i>
              )}
            </div>
            <h3>{cert.title}</h3>
            <p className="certificate-issuer">{cert.issuer} &middot; {cert.date}</p>
            <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="project-link primary">
              View Credential <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </Reveal>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState('projects')

  return (
    <section id="projects">
      <div className="container">
        <Reveal className="section-header center" as="div">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Selected Work</div>
          <h2>Featured Projects</h2>
          <p>Client websites, my own WordPress portfolio, and certifications — all in one place.</p>
        </Reveal>

        <div className="tabs-bar" role="tablist" aria-label="Projects section tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'projects' && <ProjectsPanel key="projects" />}
          {activeTab === 'portfolio' && <PortfolioPanel key="portfolio" />}
          {activeTab === 'certificates' && <CertificatesPanel key="certificates" />}
        </AnimatePresence>
      </div>
    </section>
  )
}
