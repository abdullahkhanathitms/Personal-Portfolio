import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-inner">
        <a href="#home" className="logo" onClick={closeMenu}>
          AK<span>.</span>
        </a>

        <ul id="menuList" className="nav-links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className={active === link.href ? 'active' : ''}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button id="themeBtn" onClick={toggleTheme} aria-label="Toggle theme">
            <i className="fa-solid fa-moon"></i>
            <i className="fa-solid fa-sun"></i>
          </button>
          <a href="#contact" className="btn btn-primary btn-sm nav-cta">Let's Talk</a>
          <button
            className="menu-icon"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <i className={menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
          </button>
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <>
                {/* Backdrop for closing when clicking outside */}
                <motion.div
                  className="mobile-sidebar-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={closeMenu}
                  aria-hidden="true"
                />

                {/* Slide-in sidebar drawer */}
                <motion.aside
                  className="mobile-sidebar-drawer"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 26, stiffness: 240 }}
                  aria-label="Mobile Navigation Drawer"
                >
                  <div className="mobile-sidebar-header">
                    <a href="#home" className="logo" onClick={closeMenu}>
                      AK<span>.</span>
                    </a>
                    <button
                      className="mobile-sidebar-close-btn"
                      onClick={closeMenu}
                      aria-label="Close menu"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>

                  <ul className="mobile-sidebar-links">
                    {LINKS.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={closeMenu}
                          className={active === link.href ? 'active' : ''}
                        >
                          <span>{link.label}</span>
                          <i className="fa-solid fa-chevron-right mobile-nav-arrow"></i>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="mobile-sidebar-footer">
                    <a href="#contact" className="btn btn-primary mobile-sidebar-cta" onClick={closeMenu}>
                      <span>Let's Talk</span>
                      <i className="fa-solid fa-paper-plane"></i>
                    </a>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </nav>
  )
}
