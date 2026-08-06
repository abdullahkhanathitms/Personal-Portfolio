import Reveal from './Reveal'

/**
 * Illustrative placeholders written to match the real project types on this
 * site (real estate, eCommerce, corporate). Swap in genuine client quotes
 * as they come in — these are here so the section isn't empty at launch.
 */
const TESTIMONIALS = [
  {
    quote: 'Our new site went live ahead of schedule and the lead-capture forms started converting from day one. Communication throughout the build was clear and consistent.',
    name: 'Michael R.',
    role: 'Real Estate Agency, Singapore',
  },
  {
    quote: 'The WooCommerce build handled our catalog and payments without a hitch. What impressed us most was how fast the storefront loaded, even on mobile.',
    name: 'Sara K.',
    role: 'eCommerce Founder',
  },
  {
    quote: 'A genuinely smooth process from wireframe to launch. The WordPress site is easy for our own team to update, which was exactly what we needed.',
    name: 'Farhan A.',
    role: 'Marketing Lead, Corporate Client',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="container">
        <Reveal className="section-header center" as="div">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Testimonials</div>
          <h2>What Clients Say</h2>
          <p>A few notes from the kind of projects I work on most — real estate, eCommerce and corporate websites.</p>
        </Reveal>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.08} className="testimonial-card glass">
              <i className="fa-solid fa-quote-left testimonial-quote-icon"></i>
              <p className="testimonial-text">{t.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                <div>
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
