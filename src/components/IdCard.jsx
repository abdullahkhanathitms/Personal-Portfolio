import React from 'react'

export default function IdCard() {
  return (
    <div className="id-card-assembly">
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

      {/* Lanyard assembly: 2 ribbon straps in a V-angle coming from the top section + metal clasp */}
      <div className="lanyard-hang-system">
        {/* Dual V-shaped orange fabric straps with AK. print */}
        <div className="lanyard-v-straps">
          <div className="lanyard-strap strap-left">
            <span className="strap-text">AK.</span>
          </div>
          <div className="lanyard-strap strap-right">
            <span className="strap-text">AK.</span>
          </div>
        </div>

        {/* Realistic vector metal lobster carabiner clasp */}
        <div className="lanyard-clip-wrap">
          <svg
            className="lanyard-metal-clip"
            width="52"
            height="62"
            viewBox="0 0 52 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="metalSilver" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="35%" stopColor="#FFFFFF" />
                <stop offset="65%" stopColor="#94A3B8" />
                <stop offset="85%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>
              <linearGradient id="metalDark" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <filter id="clipShadow" x="-30%" y="-20%" width="160%" height="150%">
                <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="rgba(0,0,0,0.4)" />
              </filter>
            </defs>

            {/* Top horizontal clamp securing the orange ribbon */}
            <rect x="11" y="0" width="30" height="7" rx="2" fill="url(#metalSilver)" filter="url(#clipShadow)" />
            <rect x="14" y="2" width="24" height="3" rx="1" fill="#64748B" />

            {/* Swivel eyelet ring */}
            <circle cx="26" cy="13" r="5" fill="none" stroke="url(#metalSilver)" strokeWidth="2.8" filter="url(#clipShadow)" />
            <circle cx="26" cy="13" r="2.2" fill="#1E293B" opacity="0.65" />

            {/* Lobster clasp body */}
            <path
              d="M21 17 C21 23, 17 31, 17 38 C17 49, 23 54, 26 54 C29 54, 35 49, 35 38 C35 31, 31 23, 31 17 Z"
              fill="url(#metalSilver)"
              filter="url(#clipShadow)"
            />
            {/* Clasp inner cutout */}
            <path
              d="M22 26 C22 33, 21 38, 22 44 C23 48, 29 48, 30 44 C31 38, 30 33, 30 26 Z"
              fill="#0F172A"
              opacity="0.5"
            />
            {/* Spring hinge bar */}
            <path d="M19 30 L27 42" stroke="url(#metalDark)" strokeWidth="2" strokeLinecap="round" />

            {/* Hook loop that passes visibly through the center slot */}
            <path
              d="M26 50 C26 58, 21 61, 19 61 C16.5 61, 15 58, 15 54"
              fill="none"
              stroke="url(#metalSilver)"
              strokeWidth="3.2"
              strokeLinecap="round"
              filter="url(#clipShadow)"
            />
          </svg>
        </div>
      </div>

      {/* Main ID Card Plastic Badge Holder */}
      <div className="id-card-holder">
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
      </div>
    </div>
  )
}
