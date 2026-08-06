import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'

const FAQS = [
  {
    q: 'What services do you offer?',
    a: 'WordPress development, front-end development, and eCommerce builds on WooCommerce and Shopify — plus Webflow and Framer for design-forward marketing sites. I also handle ongoing site maintenance and performance optimization.',
  },
  {
    q: 'How long does a typical project take?',
    a: "It depends on scope — a landing page usually takes about a week, while a full WordPress or eCommerce build with custom pages typically runs 2–4 weeks. I'll give you a clear timeline upfront once I understand the project.",
  },
  {
    q: 'Do you work with international clients?',
    a: "Yes. I've delivered projects for clients in Singapore, Kuwait and Pakistan, working fully remote with clear async communication and regular progress updates.",
  },
  {
    q: "What's your development process like?",
    a: "Discovery and requirements first, then wireframes or a design reference, followed by development in stages so you can review progress early. I test across devices and browsers before handoff, and walk you through how to manage the site afterward.",
  },
  {
    q: 'Do you offer support after the site goes live?',
    a: "Yes — I offer post-launch maintenance including updates, bug fixes and performance checks, either as a one-time engagement or an ongoing monthly arrangement depending on what you need.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i))

  return (
    <section id="faq">
      <div className="container">
        <Reveal className="section-header center" as="div">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Got Questions?</div>
          <h2>Frequently Asked Questions</h2>
          <p>A few things people usually ask before we start working together.</p>
        </Reveal>

        <div className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <Reveal key={item.q} delay={i * 0.06} className="faq-item glass">
                <button
                  className="faq-question"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{item.q}</span>
                  <i className={`fa-solid fa-chevron-down faq-chevron ${isOpen ? 'open' : ''}`}></i>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      className="faq-answer-wrap"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="faq-answer">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
