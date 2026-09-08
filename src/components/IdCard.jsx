import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, animate } from 'framer-motion'

export default function IdCard() {
  // Pure rotational pendulum physics around the fixed attachment point (top hook)
  const rotationRaw = useMotionValue(0)
  const rotation = useSpring(rotationRaw, {
    stiffness: 140,
    damping: 10,
    mass: 1.1,
  })

  const isDragging = useRef(false)
  const startX = useRef(0)
  const cardRef = useRef(null)
  const lastVelocity = useRef(0)
  const lastX = useRef(0)
  const lastTime = useRef(0)

  const handlePointerDown = (e) => {
    isDragging.current = true
    startX.current = e.clientX
    lastX.current = e.clientX
    lastTime.current = performance.now()
    lastVelocity.current = 0
    if (e.target && e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId)
    }
  }

  const handlePointerMove = (e) => {
    if (!isDragging.current) return
    const now = performance.now()
    const dt = Math.max(now - lastTime.current, 1)
    const dxFromLast = e.clientX - lastX.current
    lastVelocity.current = dxFromLast / dt // px per ms
    lastX.current = e.clientX
    lastTime.current = now

    // Total displacement from start
    const deltaX = e.clientX - startX.current
    // In CSS rotate(deg), positive turns clockwise (bottom moves left),
    // negative turns counter-clockwise (bottom moves right).
    // Negating deltaX ensures:
    // Dragging RIGHT (deltaX > 0) -> bottom swings RIGHT.
    // Dragging LEFT (deltaX < 0) -> bottom swings LEFT.
    // Clamped gracefully between -30 and +30 degrees
    const angle = Math.max(-30, Math.min(30, -deltaX * 0.16))
    rotationRaw.set(angle)
  }

  const handlePointerUp = (e) => {
    if (!isDragging.current) return
    isDragging.current = false
    try {
      if (e.target && e.target.releasePointerCapture) {
        e.target.releasePointerCapture(e.pointerId)
      }
    } catch (_) {}

    // Add natural inertia & slight overshoot in the same direction of flick
    const releaseMomentum = Math.max(-12, Math.min(12, -lastVelocity.current * 14))
    const currentAngle = rotationRaw.get()
    const overshootAngle = currentAngle + releaseMomentum

    // First flick to overshoot target then natural spring back to 0
    rotationRaw.set(overshootAngle)
    setTimeout(() => {
      rotationRaw.set(0)
    }, 40)
  }

  return (
    <div className="id-card-assembly">
      {/* Mobile top supportive hanger rod so the card clearly appears hanging from a mount */}
      <div className="mobile-hanger-mount" aria-hidden="true">
        <span className="hanger-bracket bracket-left"></span>
        <span className="hanger-rod"></span>
        <span className="hanger-pin"></span>
        <span className="hanger-bracket bracket-right"></span>
      </div>

      {/* Decorative 'That's Me!' annotation pointing to the card */}
      <div className="thats-me-annotation" aria-hidden="true">
        <span>That's Me!</span>
        <svg width="46" height="34" viewBox="0 0 46 34" fill="none">
          <path
            d="M6 4C14 16 28 26 38 22"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M32 26L40 22L37 14"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Top right spark burst */}
      <div className="id-spark-burst" aria-hidden="true">
        <span className="spark spark-1"></span>
        <span className="spark spark-2"></span>
        <span className="spark spark-3"></span>
      </div>

      {/* FIXED TOP ATTACHMENT POINT: Ribbon and Lobster Clasp never move */}
      <div className="lanyard-hang-system">
        <img
          src="/lanyard-ribbon.png"
          alt="AK Lanyard Ribbon"
          className="lanyard-ribbon-img"
        />
      </div>

      {/* SWINGING ID CARD HOLDER: Swings strictly around fixed top attachment point */}
      <motion.div
        ref={cardRef}
        className="id-card-holder id-card-interactive-swing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          rotate: rotation,
          transformOrigin: '50% 19px', // exactly at the top center slot loop
          cursor: 'grab',
          touchAction: 'none',
        }}
      >
        {/* Transparent top pouch header with 3 die-cut slots */}
        <div className="id-holder-top-bar">
          <span className="id-slot id-slot-side"></span>
          <span className="id-slot id-slot-center"></span>
          <span className="id-slot id-slot-side"></span>
        </div>

        {/* Card Content Paper (Encased inside holder) */}
        <div className="id-card-body">
          {/* Card Top Brand Header */}
          <div className="id-card-header">
            <div className="id-brand">
              <div className="id-logo-text">AK<span>.</span></div>
              <div className="id-brand-subtitle">WEB DEVELOPER</div>
            </div>
            <div className="id-motto-column">
              <div className="id-motto-line"></div>
              <div className="id-motto-words">
                <span>BUILD</span>
                <span>CODE</span>
                <span>CREATE</span>
                <span>GROW</span>
              </div>
            </div>
          </div>

          {/* Avatar Section with Concentric Rings & Dynamic Waves */}
          <div className="id-avatar-section">
            {/* Decorative curved waves background */}
            <svg
              className="id-waves-bg"
              viewBox="0 0 340 160"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="waveGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="var(--accent-glow)" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="waveGradSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path d="M0,70 Q75,15 170,68 T340,55 L340,160 L0,160 Z" fill="url(#waveGradSecondary)" />
              <path d="M0,95 Q85,42 170,95 T340,80 L340,160 L0,160 Z" fill="url(#waveGradPrimary)" />
            </svg>

            {/* Fog / Smoke Fade Overlay to seamlessly merge waves into card body without any sharp line */}
            <div className="id-avatar-fog-overlay" aria-hidden="true"></div>

            {/* Dot Matrix Pattern Accents */}
            <div className="id-dot-matrix id-dots-left" aria-hidden="true">
              <span></span><span></span><span></span>
              <span></span><span></span><span></span>
              <span></span><span></span><span></span>
              <span></span><span></span><span></span>
            </div>
            <div className="id-dot-matrix id-dots-right" aria-hidden="true">
              <span></span><span></span><span></span>
              <span></span><span></span><span></span>
              <span></span><span></span><span></span>
              <span></span><span></span><span></span>
            </div>

            {/* Circular Profile Photo with Glowing Ring */}
            <div className="id-avatar-frame">
              <div className="id-avatar-ring">
                <img
                  src="/abdullah-avatar-circle.png"
                  alt="Abdullah Khan"
                  className="id-avatar-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Name & Role Designation */}
          <div className="id-name-block">
            <h3 className="id-name">
              Abdullah <span className="id-surname">Khan</span>
            </h3>
            <div className="id-role">FULL STACK DEVELOPER</div>
          </div>

          {/* Detailed Info Grid */}
          <div className="id-info-grid">
            <div className="id-info-row">
              <div className="id-info-key">
                <i className="fa-solid fa-user"></i>
                <span>Name</span>
              </div>
              <span className="id-colon">:</span>
              <span className="id-info-val">Abdullah Khan</span>
            </div>

            <div className="id-info-row">
              <div className="id-info-key">
                <i className="fa-solid fa-calendar-days"></i>
                <span>DOB</span>
              </div>
              <span className="id-colon">:</span>
              <span className="id-info-val">15 Mar, 2005</span>
            </div>

            <div className="id-info-row">
              <div className="id-info-key">
                <i className="fa-solid fa-phone"></i>
                <span>Phone</span>
              </div>
              <span className="id-colon">:</span>
              <a href="tel:+923700158852" className="id-info-val id-link">
                +92 370 0158852
              </a>
            </div>

            <div className="id-info-row">
              <div className="id-info-key">
                <i className="fa-solid fa-envelope"></i>
                <span>Email</span>
              </div>
              <span className="id-colon">:</span>
              <a href="mailto:abdullahkhan824779@gmail.com" className="id-info-val id-link id-email-val">
                abdullahkhan824779@gmail.com
              </a>
            </div>

            <div className="id-info-row">
              <div className="id-info-key">
                <i className="fa-solid fa-location-dot"></i>
                <span>Location</span>
              </div>
              <span className="id-colon">:</span>
              <span className="id-info-val">Hyderabad, Pakistan</span>
            </div>

            <div className="id-info-row">
              <div className="id-info-key">
                <i className="fa-brands fa-github"></i>
                <span>GitHub</span>
              </div>
              <span className="id-colon">:</span>
              <a
                href="https://github.com/abdullahkhanathitms"
                target="_blank"
                rel="noopener noreferrer"
                className="id-info-val id-link"
              >
                github.com/AbdullahKhan
              </a>
            </div>
          </div>

          {/* Footer: Signature & Motto */}
          <div className="id-card-footer">
            <div className="id-signature-wrap">
              <img
                src="/signature-dark.png"
                alt="Abdullah Khan Signature"
                className="id-signature id-sig-dark"
              />
              <img
                src="/signature-light.png"
                alt="Abdullah Khan Signature"
                className="id-signature id-sig-light"
              />
            </div>
            <div className="id-footer-motto">
              <div className="id-motto-text">TURNING IDEAS</div>
              <div className="id-motto-sub">INTO REALITY</div>
              <div className="id-motto-bar"></div>
            </div>
          </div>

          {/* Dynamic Bottom Swoosh Wave Graphic */}
          <div className="id-bottom-wave">
            <svg viewBox="0 0 340 30" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M0,15 C90,30 220,-5 340,15 L340,30 L0,30 Z"
                fill="var(--primary)"
                opacity="0.9"
              />
              <path
                d="M0,22 C110,32 240,8 340,24 L340,30 L0,30 Z"
                fill="var(--secondary)"
                opacity="0.6"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
