import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { SOCIALS } from '../data/socials'
import { useTypewriter } from '../hooks/useTypewriter'
import TechOrbit from './TechOrbit'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const heroRef = useRef(null)
  // One-shot typewriter on the name only — types once and stops, so it
  // never reflows the layout after the initial animation settles.
  const typedName = useTypewriter(['Abdullah Khan'], { loop: false, typingSpeed: 85 })

  const handleMouseMove = useCallback((e) => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }, [])

  return (
    <section id="home" className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
      <div className="hero-bg" aria-hidden="true">
        <span className="blob blob-a"></span>
        <span className="blob blob-b"></span>
        <span className="blob blob-c"></span>
        <span className="hero-grid"></span>
        <span className="hero-spotlight"></span>
      </div>

      <div className="container hero-inner">
        <motion.div className="hero-copy" variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="hero-tag">
            <span className="dot-pulse"></span>
            Open to freelance &amp; remote projects
          </motion.div>

          <motion.h1 variants={item}>
            Hi, I'm <span className="text-gradient hero-cursor">{typedName}</span>
            <br />
            I build &amp; optimize
            <br />
            full-stack web apps
          </motion.h1>

          <motion.p variants={item} className="hero-lede">
            Full-Stack &amp; CMS Developer crafting fast, responsive web apps and websites.
          </motion.p>

          <motion.div variants={item} className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View My Work <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <i className="fa-solid fa-file-arrow-down"></i> Resume
            </a>
          </motion.div>

          <motion.div variants={item} className="hero-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="hero-social-link">
                <i className={s.icon}></i>
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <TechOrbit />
        </motion.div>
      </div>

      <a href="#about" className="hero-scroll" aria-label="Scroll to About section">
        <span></span>
      </a>
      <div className="hero-bottom-fade" aria-hidden="true"></div>
    </section>
  )
}
