import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'

const TESTIMONIALS = [
  {
    id: 1,
    quote: 'Our new site went live ahead of schedule and the lead-capture forms started converting from day one. Communication throughout the build was clear and consistent.',
    name: 'Michael R.',
    role: 'Real Estate Agency, Singapore',
  },
  {
    id: 2,
    quote: 'The WooCommerce build handled our catalog and payments without a hitch. What impressed us most was how fast the storefront loaded, even on mobile.',
    name: 'Sara K.',
    role: 'eCommerce Founder',
  },
  {
    id: 3,
    quote: 'A genuinely smooth process from wireframe to launch. The WordPress site is easy for our own team to update, which was exactly what we needed.',
    name: 'Farhan A.',
    role: 'Marketing Lead, Corporate Client',
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = () => {
    setActiveIndex((prev) => (prev < TESTIMONIALS.length - 1 ? prev + 1 : 0))
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS.length - 1))
  }

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 35
    if (info.offset.x < -swipeThreshold) {
      handleNext()
    } else if (info.offset.x > swipeThreshold) {
      handlePrev()
    }
  }

  const currentTestimonial = TESTIMONIALS[activeIndex]

  return (
    <section id="testimonials">
      <div className="container">
        <Reveal className="section-header center" as="div">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Testimonials</div>
          <h2>What Clients Say</h2>
          <p>A few notes from the kind of projects I work on most — real estate, eCommerce and corporate websites.</p>
        </Reveal>

        {/* Desktop Grid Layout */}
        <div className="testimonials-grid desktop-only-grid">
          {TESTIMONIALS.map((t) => (
            <Reveal key={t.id} delay={t.id * 0.08} className="testimonial-card glass">
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

      {/* Mobile/Tablet Centered Draggable Card Slider with Dots */}
      <div className="testimonials-slider-mobile">
        <div className="slider-card-viewport">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={handleDragEnd}
              className="testimonial-card glass centered-mobile-card"
            >
              <i className="fa-solid fa-quote-left testimonial-quote-icon"></i>
              <p className="testimonial-text">{currentTestimonial.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{currentTestimonial.name.charAt(0)}</div>
                <div>
                  <h4>{currentTestimonial.name}</h4>
                  <span>{currentTestimonial.role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Navigation */}
        <div className="slider-dots">
          {TESTIMONIALS.map((t, idx) => (
            <span
              key={t.id}
              className={`slider-dot ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
