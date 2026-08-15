import { useState, useEffect } from 'react'
import Reveal from './Reveal'
import { SOCIALS } from '../data/socials'

// ⚠️ TODO: these EmailJS credentials belonged to the previous portfolio owner's
// account. Replace with your own Public Key / Service ID / Template ID from
// https://dashboard.emailjs.com before deploying, or the form won't send
// mail to you. The form UI and submit logic below are otherwise unchanged.
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''

const CONTACT_DETAILS = [
  { icon: 'fa-solid fa-envelope', label: 'Email', value: 'abdullahkhan824779@gmail.com', href: 'mailto:abdullahkhan824779@gmail.com' },
  { icon: 'fa-solid fa-phone', label: 'Phone', value: '+92 370 0158852', href: 'tel:+923700158852' },
  { icon: 'fa-solid fa-location-dot', label: 'Location', value: 'Hyderabad, Pakistan' },
]

export default function Contact() {
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)
  const [ready, setReady] = useState(false)

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
        setStatus({ type: 'success', message: "Message sent successfully! I'll get back to you soon." })
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
    <section id="contact">
      <div className="container">
        <Reveal className="section-header center" as="div">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Let's Talk</div>
          <h2>Have a project in mind?</h2>
          <p>Have a WordPress build, storefront or corporate website in mind? I'd love to hear about it.</p>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-info-panel glass">
            <h3>Contact Information</h3>
            <p>Fill out the form or reach out directly through any of the channels below.</p>

            <div className="contact-details">
              {CONTACT_DETAILS.map((c) => (
                <div className="contact-detail-row" key={c.label}>
                  <div className="contact-detail-icon"><i className={c.icon}></i></div>
                  <div>
                    <span className="contact-detail-label">{c.label}</span>
                    {c.href ? <a href={c.href}>{c.value}</a> : <p>{c.value}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-social-row">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="contact-form-panel glass">
            <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="from_name">Name</label>
                  <input id="from_name" placeholder="Your name" name="from_name" type="text" required />
                </div>
                <div className="form-field">
                  <label htmlFor="from_email">Email</label>
                  <input id="from_email" placeholder="you@email.com" name="from_email" type="email" required />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Tell me about your project..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" disabled={sending || !ready}>
                {sending ? 'Sending...' : 'Send Message'} <i className="fa-solid fa-paper-plane"></i>
              </button>
              {status.message && (
                <div className={`form-status ${status.type}`}>{status.message}</div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
