import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import { GITHUB_USER } from '../data/socials'
import { PERSONAL_PORTFOLIO_ITEMS, CERTIFICATES, LOR_ITEMS } from '../data/showcase'

const FEATURED_PROJECTS = [
  {
    id: 'featured-aura',
    name: 'Aura by Ali Hassan — eCommerce Platform',
    description:
      'A multi-category WooCommerce storefront engineered for high-volume sales, custom product filtering, seamless checkout, and scalable inventory management.',
    tags: ['WordPress', 'WooCommerce', 'eCommerce'],
    liveUrl: 'https://aurabyalihassan.com',
    icon: 'fa-solid fa-store',
  },
  {
    id: 'featured-soul-project',
    name: 'The Soul Project — Luxury Storefront',
    description:
      'A high-converting WooCommerce and Shopify-powered online store for a Kuwait-based eCommerce brand, featuring fast product pages and secure payment integration.',
    tags: ['WooCommerce', 'Shopify', 'eCommerce'],
    liveUrl: 'https://thesoulprojectkw.com',
    icon: 'fa-solid fa-cart-shopping',
  },
  {
    id: 'featured-peshawar-zalmi',
    name: 'Peshawar Zalmi — Corporate Platform',
    description:
      'A performance-focused corporate digital platform engineered with WordPress, Webflow, and Framer, balancing high brand aesthetics with fast responsive performance.',
    tags: ['WordPress', 'Webflow', 'Framer'],
    liveUrl: 'https://peshawarzalmi.com',
    icon: 'fa-solid fa-building',
  },
  {
    id: 'featured-singapore-real-estate',
    name: 'Singapore Real Estate Platforms',
    description:
      'A set of property-listing websites built for the Singapore real estate market — structured listing pages, lead-capture forms and dedicated landing pages.',
    tags: ['WordPress', 'Webflow', 'Elementor Pro'],
    liveUrl: 'https://savewithproperty.sg',
    icon: 'fa-solid fa-house-chimney',
  },
  {
    id: 'featured-shopco-api',
    name: 'ShopCo — Full-Stack eCommerce API',
    description:
      'A full-stack eCommerce backend API built with Node.js, Express.js, and MongoDB, delivering RESTful product catalogs, cart management, and order workflows.',
    tags: ['Node.js', 'Express.js', 'MongoDB'],
    liveUrl: 'https://shopco-codealpha.vercel.app/',
    icon: 'fa-solid fa-server',
  },
]

const TABS = [
  { id: 'projects', label: 'Projects', icon: 'fa-solid fa-diagram-project' },
  { id: 'portfolio', label: 'Personal Portfolio', icon: 'fa-brands fa-wordpress' },
  { id: 'certificates', label: 'Certificates', icon: 'fa-solid fa-certificate' },
  { id: 'lor', label: 'LOR & Recommendation', icon: 'fa-solid fa-award' },
]

function getTagClass(tag) {
  const normalized = tag.toLowerCase().replace(/[^a-z0-0]/g, '')
  return `tag-${normalized}`
}

const panelMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
}

function ProjectsPanel() {
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
              {project.tags.slice(0, 3).map((tag) => (
                <span className={`tech-tag ${getTagClass(tag)}`} key={tag}>{tag}</span>
              ))}
            </div>

            <div className="project-actions">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link primary">
                {project.id === 'featured-shopco-api' ? 'Live Site' : 'Live Site'} <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </Reveal>
        ))}

        {/* 6th Card: GitHub Showcase Card */}
        <Reveal delay={0.3} className="project-card glass github-showcase-card">
          <div className="project-card-top">
            <div className="project-icon"><i className="fa-brands fa-github"></i></div>
            <span className="project-featured-tag"><i className="fa-solid fa-code-branch"></i> Repositories</span>
          </div>

          <h3>Explore More Work on GitHub</h3>
          <p>Looking for additional full-stack web applications, custom CMS themes, REST API backends, and open-source code? Explore my GitHub.</p>

          <div className="repo-meta">
            <span className="tech-tag tag-github">GitHub</span>
            <span className="tech-tag tag-opensource">Open-Source</span>
          </div>

          <div className="project-actions">
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <i className="fa-brands fa-github"></i> View My GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </motion.div>
  )
}

function PortfolioPanel() {
  return (
    <motion.div {...panelMotion} className="portfolio-panel-list">
      {PERSONAL_PORTFOLIO_ITEMS.map((p) => (
        <div className="portfolio-card glass" key={p.id}>
          <a 
            href={p.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="portfolio-preview"
            title={`Click to visit ${p.name}`}
          >
            <div className="portfolio-browser-bar">
              <span></span><span></span><span></span>
            </div>

            <div className="portfolio-image-viewport">
              <img src={p.image} alt={p.name} className="portfolio-scrolling-image" loading="lazy" decoding="async" />
            </div>
          </a>

          <div className="portfolio-info">
            <h3>{p.name}</h3>
            <p>{p.description}</p>

            <div className="repo-meta">
              {p.tags.slice(0, 3).map((tag) => (
                <span className="tech-tag" key={tag}>{tag}</span>
              ))}
            </div>

            <div className="project-actions">
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link primary">
                Visit Site <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

function ImageCertCard({ item, onSelect }) {
  return (
    <div className="cert-image-card glass" onClick={() => onSelect(item)}>
      <div className="cert-image-wrap">
        <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
        <div className="cert-image-overlay">
          <span className="cert-zoom-btn">
            <i className="fa-solid fa-magnifying-glass-plus"></i> View Full
          </span>
        </div>
      </div>
      <div className="cert-card-caption">
        <h4>{item.title}</h4>
        <span className="cert-card-sub">{item.issuer} &middot; {item.date}</span>
      </div>
    </div>
  )
}

function CertificatesPanel({ onSelect }) {
  return (
    <motion.div {...panelMotion}>
      <div className="cert-showcase-grid">
        {CERTIFICATES.map((cert, i) => (
          <Reveal key={cert.id} delay={i * 0.08}>
            <ImageCertCard item={cert} onSelect={onSelect} />
          </Reveal>
        ))}
      </div>
    </motion.div>
  )
}

function LorPanel({ onSelect }) {
  return (
    <motion.div {...panelMotion}>
      <div className="cert-showcase-grid lor-showcase-grid">
        {LOR_ITEMS.map((lor, i) => (
          <Reveal key={lor.id} delay={i * 0.08}>
            <ImageCertCard item={lor} onSelect={onSelect} />
          </Reveal>
        ))}
      </div>
    </motion.div>
  )
}

function CertModal({ item, onClose }) {
  if (!item) return null
  return (
    <AnimatePresence>
      <motion.div
        className="cert-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="cert-modal-content glass"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="cert-modal-close" onClick={onClose} aria-label="Close modal">
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="cert-modal-body">
            <div className="cert-modal-img-wrap">
              <img src={item.image} alt={item.title} className="cert-modal-img" loading="eager" decoding="async" />
            </div>
            <div className="cert-modal-meta">
              <h3>{item.title}</h3>
              <p className="cert-modal-issuer">{item.issuer} &middot; {item.date}</p>
              {item.description && <p className="cert-modal-desc">{item.description}</p>}
              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ marginTop: '1rem' }}
                >
                  Verify Credential <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState('projects')
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <section id="projects">
      <div className="container">
        <Reveal className="section-header center" as="div">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Selected Work</div>
          <h2>Featured Work &amp; Credentials</h2>
          <p>Full-Stack web applications, custom WordPress &amp; Webflow builds, official certifications, and recommendation letters.</p>
        </Reveal>

        <div className="tabs-bar-container">
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
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'projects' && <ProjectsPanel key="projects" />}
          {activeTab === 'portfolio' && <PortfolioPanel key="portfolio" />}
          {activeTab === 'certificates' && <CertificatesPanel key="certificates" onSelect={setSelectedItem} />}
          {activeTab === 'lor' && <LorPanel key="lor" onSelect={setSelectedItem} />}
        </AnimatePresence>

        {selectedItem && (
          <CertModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </div>
    </section>
  )
}
