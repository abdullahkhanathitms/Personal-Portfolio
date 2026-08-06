import Reveal from './Reveal'

const SERVICES = [
  {
    icon: 'fa-brands fa-wordpress',
    title: 'WordPress Development',
    text: 'Custom WordPress builds with Elementor Pro — landing pages, corporate sites and content-managed platforms clients can update themselves.',
  },
  {
    icon: 'fa-solid fa-laptop-code',
    title: 'Front-End Development',
    text: 'Responsive, cross-browser interfaces built with HTML5, CSS3, Bootstrap and JavaScript, with React where a project needs it.',
  },
  {
    icon: 'fa-solid fa-cart-shopping',
    title: 'eCommerce Solutions',
    text: 'WooCommerce storefronts — product catalogs, payment integration and checkout flows built to convert.',
  },
  {
    icon: 'fa-solid fa-gauge-high',
    title: 'Optimization & Maintenance',
    text: 'Page-speed tuning, SEO fundamentals and ongoing website maintenance so a site stays fast, secure and easy to find.',
  },
  {
    icon: 'fa-brands fa-webflow',
    title: 'Webflow Development',
    text: 'Visually-built, clean-code websites on Webflow — a strong fit for design-forward landing pages and marketing sites that need to launch fast.',
  },
  {
    icon: 'fa-solid fa-bolt',
    title: 'Framer Websites',
    text: 'Interactive, animation-rich sites built in Framer — great for portfolios, product launches and brands that want motion done well.',
  },
  {
    icon: 'fa-brands fa-shopify',
    title: 'Shopify Stores',
    text: 'Shopify storefronts set up to actually sell — product setup, theme customization and a checkout flow tailored to the brand.',
  },
]

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <Reveal className="section-header center" as="div">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>How I Can Help</div>
          <h2>Services</h2>
          <p>From first build to ongoing upkeep — real estate, eCommerce and corporate teams work with me for the full lifecycle of a website.</p>
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
