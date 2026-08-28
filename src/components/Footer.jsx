import { useState } from 'react'
import { SOCIALS } from '../data/socials'

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About Me' },
  { href: '#skills', label: 'Skills & Stack' },
  { href: '#experience', label: 'Work Experience' },
  { href: '#projects', label: 'Featured Projects' },
  { href: '#services', label: 'Services' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

const SERVICES_LINKS = [
  { href: '#services', label: 'Full-Stack Web Applications' },
  { href: '#services', label: 'WordPress & Webflow Development' },
  { href: '#services', label: 'Shopify & WooCommerce Stores' },
  { href: '#services', label: 'Custom REST API & Backend' },
  { href: '#services', label: 'Technical SEO & Performance' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleQuickSend = async (e) => {
    e.preventDefault()
    if (!email) return

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || EMAILJS_PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') {
      setStatus({ 
        type: 'error', 
        message: 'Please reach me directly at abdullahkhan824779@gmail.com' 
      })
      return
    }

    setSending(true)
    setStatus({ type: '', message: '' })

    try {
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_PUBLIC_KEY)
      }
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: 'Footer Quick Connect',
          from_email: email,
          message: `Quick contact inquiry from footer email: ${email}`,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus({ type: 'success', message: 'Thanks! I will get back to you soon.' })
      setEmail('')
    } catch (err) {
      console.error('Footer emailjs error:', err)
      setStatus({ type: 'error', message: 'Could not send. Please email abdullahkhan824779@gmail.com' })
    } finally {
      setSending(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer-redesigned">
      <div className="container footer-main-grid">
        {/* Col 1: Brand, Bio, Social Icons & Direct Info */}
        <div className="footer-col footer-col-brand">
          <a href="#hero" className="footer-logo">
            <span className="logo">Abdullah<span className="accent">.</span></span>
          </a>
          <p className="footer-tagline">
            Full-Stack &amp; CMS Developer specializing in fast, high-converting web applications, custom WordPress, Shopify &amp; Webflow platforms.
          </p>
          
          <div className="footer-social-icons">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="footer-social-btn">
                <i className={s.icon}></i>
              </a>
            ))}
          </div>

          <div className="footer-quick-contact">
            <a href="mailto:abdullahkhan824779@gmail.com" className="footer-contact-link">
              <i className="fa-solid fa-envelope"></i>
              <span>abdullahkhan824779@gmail.com</span>
            </a>
            <a href="tel:+923700158852" className="footer-contact-link">
              <i className="fa-solid fa-phone"></i>
              <span>+92 370 0158852</span>
            </a>
            <div className="footer-contact-link">
              <i className="fa-solid fa-location-dot"></i>
              <span>Hyderabad, Pakistan</span>
            </div>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Services / Solutions Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Services &amp; Solutions</h4>
          <ul className="footer-nav-links">
            {SERVICES_LINKS.map((s, idx) => (
              <li key={idx}>
                <a href={s.href}>{s.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Quick Connect with EmailJS */}
        <div className="footer-col footer-col-newsletter">
          <h4 className="footer-col-title">Let's Connect</h4>
          <p className="footer-newsletter-desc">
            Have a project in mind or want to discuss an opportunity? Drop your email below:
          </p>

          <form className="footer-newsletter-form" onSubmit={handleQuickSend}>
            <div className="footer-input-wrap">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="footer-email-input"
              />
              <button type="submit" className="footer-submit-btn" disabled={sending} aria-label="Send Email">
                {sending ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-paper-plane"></i>}
              </button>
            </div>
            {status.message && (
              <span className={`footer-form-status ${status.type}`}>
                {status.message}
              </span>
            )}
          </form>
        </div>
      </div>

      {/* Giant Faded Watermark Brand Typography at Bottom */}
      <div className="footer-watermark-wrap" aria-hidden="true">
        <span className="footer-watermark-text">ABDULLAH KHAN</span>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="container footer-bottom-bar">
        <p>&copy; {new Date().getFullYear()} Abdullah Khan. All rights reserved.</p>
        <button className="footer-back-to-top" onClick={scrollToTop} aria-label="Back to top">
          Back to Top <i className="fa-solid fa-arrow-up"></i>
        </button>
      </div>
    </footer>
  )
}
