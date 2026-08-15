import Reveal from './Reveal'

const SERVICES = [
  {
    icon: 'fa-solid fa-layer-group',
    title: 'Full-Stack Web Development',
    text: 'Scalable web applications built with React, Node.js, Express, MongoDB and PHP — fast, secure, and tailored for modern digital products.',
  },
  {
    icon: 'fa-brands fa-webflow',
    title: 'WordPress & Webflow CMS',
    text: 'Custom WordPress & Webflow sites with Elementor Pro and Framer — design-forward, responsive marketing sites and client-editable portals.',
  },
  {
    icon: 'fa-brands fa-shopify',
    title: 'Shopify & eCommerce Stores',
    text: 'High-converting Shopify storefronts and WooCommerce builds — product management, custom payment gateways, and optimized checkout flows.',
  },
  {
    icon: 'fa-solid fa-network-wired',
    title: 'REST API & Backend Services',
    text: 'Custom RESTful API development, backend microservices, authentication systems, and seamless third-party API integrations.',
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Database Architecture & Management',
    text: 'Data modeling, schema design, and query optimization for MongoDB, MySQL, and PostgreSQL databases ensuring high data integrity.',
  },
  {
    icon: 'fa-solid fa-gauge-high',
    title: 'Performance & SEO Optimization',
    text: 'Speed tuning, Core Web Vitals optimization, technical SEO fundamentals, and site security maintenance so websites load fast and rank well.',
  },
]

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <Reveal className="section-header center" as="div">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>How I Can Help</div>
          <h2>Services</h2>
          <p>End-to-end digital solutions — from full-stack web applications and custom CMS builds to robust backend APIs and database design.</p>
        </Reveal>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="service-card glass">
              <div className="service-number">{String(i + 1).padStart(2, '0')}</div>
              <div className="service-icon"><i className={s.icon}></i></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
