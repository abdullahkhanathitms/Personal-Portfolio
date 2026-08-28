import { useState, useEffect } from 'react'
import Reveal from './Reveal'
import { SOCIALS } from '../data/socials'

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''

const CONTACT_DETAILS = [
  { 
    icon: 'fa-solid fa-envelope', 
    label: 'Direct Email', 
    value: 'abdullahkhan824779@gmail.com', 
    href: 'mailto:abdullahkhan824779@gmail.com',
    actionText: 'Send Email'
  },
  { 
    icon: 'fa-solid fa-phone', 
    label: 'Phone / WhatsApp', 
    value: '+92 370 0158852', 
    href: 'tel:+923700158852',
    actionText: 'Call Now'
  },
  { 
    icon: 'fa-solid fa-location-dot', 
    label: 'Location', 
    value: 'Hyderabad, Pakistan',
    actionText: 'PKT (UTC+5)'
  },
]

export default function Contact() {
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)
  const [ready, setReady] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_PUBLIC_KEY)
        setReady(true)
      } else {
        const timer = setInterval(() => {
          if (window.emailjs) {
            window.emailjs.init(EMAILJS_PUBLIC_KEY)
            setReady(true)
            clearInterval(timer)
          }
        }, 500)
        return () => clearInterval(timer)
      }
    } else {
      setReady(true)
    }
  }, [])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('abdullahkhan824779@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || EMAILJS_PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') {
      setStatus({ 
        type: 'error', 
        message: 'EmailJS keys are missing! Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in Vercel or .env.local' 
      })
      return
    }

    setSending(true)
    setStatus({ type: '', message: '' })

    const form = e.target

    try {
      const res = await window.emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        EMAILJS_PUBLIC_KEY
      )

      if (res.status === 200 || res.text === 'OK') {
        setStatus({ type: 'success', message: "Message sent successfully! I'll get back to you within 24 hours." })
        form.reset()
      } else {
        throw new Error('Send failed')
      }
    } catch (err) {
      console.error('EmailJS submit error:', err)
      setStatus({ type: 'error', message: 'Failed to send. Please email me directly at abdullahkhan824779@gmail.com' })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="contact-section-enhanced">
      <div className="container">
        <Reveal className="section-header center" as="div">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="eyebrow-dot"></span> Get In Touch
          </div>
          <h2>Let's Build Something Exceptional</h2>
          <p>Whether you need a custom WordPress site, a scalable full-stack web app, or an eCommerce store, let's connect and discuss your project.</p>
        </Reveal>

        <div className="contact-grid-enhanced">
          {/* Left Info Panel */}
          <Reveal className="contact-info-panel-modern glass">
            <h3>Contact Information</h3>
            <p className="contact-subtitle">
              Reach out directly or send a message. I typically respond within a few hours.
            </p>

            <div className="contact-cards-list">
              {CONTACT_DETAILS.map((c) => (
                <div className="contact-item-card" key={c.label}>
                  <div className="contact-item-icon">
                    <i className={c.icon}></i>
                  </div>
                  <div className="contact-item-content">
                    <span className="contact-item-label">{c.label}</span>
                    {c.href ? (
                      <a href={c.href} className="contact-item-value">{c.value}</a>
                    ) : (
                      <span className="contact-item-value">{c.value}</span>
                    )}
                  </div>
                  {c.label === 'Direct Email' && (
                    <button 
                      type="button" 
                      onClick={handleCopyEmail} 
                      className="contact-copy-btn"
                      title="Copy Email"
                      aria-label="Copy Email"
                    >
                      <i className={copied ? "fa-solid fa-check" : "fa-solid fa-copy"}></i>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="contact-social-section">
              <span className="social-label">Follow &amp; Connect</span>
              <div className="contact-social-pills">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social-pill-link">
                    <i className={s.icon}></i>
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right Interactive Form Panel */}
          <Reveal delay={0.1} className="contact-form-panel-modern glass">
            <form className="contact-form-enhanced" id="contactForm" onSubmit={handleSubmit}>
              <div className="form-row-dual">
                <div className="form-input-group">
                  <label htmlFor="from_name" className="field-label">Your Name</label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-user input-icon"></i>
                    <input id="from_name" placeholder="Your name" name="from_name" type="text" required />
                  </div>
                </div>
                <div className="form-input-group">
                  <label htmlFor="from_email" className="field-label">Email Address</label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-envelope input-icon"></i>
                    <input id="from_email" placeholder="Your email" name="from_email" type="email" required />
                  </div>
                </div>
              </div>

              <div className="form-input-group">
                <label htmlFor="subject" className="field-label">Subject</label>
                <div className="input-with-icon">
                  <i className="fa-solid fa-pen-to-square input-icon"></i>
                  <input id="subject" placeholder="Subject" name="subject" type="text" required />
                </div>
              </div>

              <div className="form-input-group">
                <label htmlFor="message" className="field-label">Message</label>
                <div className="input-with-icon textarea-icon-wrap">
                  <i className="fa-solid fa-message input-icon textarea-icon"></i>
                  <textarea 
                    id="message" 
                    name="message" 
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="btn btn-primary contact-submit-btn" disabled={sending || !ready}>
                {sending ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> Sending Message...
                  </>
                ) : (
                  <>
                    Send Message <i className="fa-solid fa-paper-plane"></i>
                  </>
                )}
              </button>

              {status.message && (
                <div className={`form-status-enhanced ${status.type}`}>
                  <i className={status.type === 'success' ? "fa-solid fa-circle-check" : "fa-solid fa-circle-exclamation"}></i>
                  <span>{status.message}</span>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
