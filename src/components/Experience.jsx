import Reveal from './Reveal'

const EXPERIENCE = [
  {
    company: 'Brixq Software House',
    role: 'Web Development Intern',
    date: 'Jul 2023 – Jul 2024',
    badge: 'Internship (1 Year)',
    logoType: 'letter',
    logoLetter: 'B',
    points: [
      'Completed a 1-year intensive web development internship mastering frontend & CMS development.',
      'Created personal portfolio site on WordPress and built 30+ responsive websites and eCommerce stores.',
      'Learned HTML5, CSS3, JavaScript, PHP, WordPress theme customization, and Shopify store setup.',
      'Delivered client-facing frontend projects which led to a full-time developer role at Brixq.',
    ],
  },
  {
    company: 'CodeAlpha',
    role: 'Full-Stack Developer Intern (Virtual)',
    date: 'Aug 2026 – Sep 2026',
    badge: 'Internship',
    logoType: 'icon',
    logoIcon: 'fa-solid fa-code',
    points: [
      'Engineered full-stack web application modules, implementing dynamic front-end components and robust back-end RESTful API endpoints.',
      'Developed responsive, cross-browser compatible user interfaces and integrated secure server-side database workflows with Node.js & MongoDB.',
      'Successfully fulfilled all program requirements, earning an official Certificate of Completion and Letter of Recommendation (LOR).',
    ],
  },
  {
    company: 'Brixq Software House',
    role: 'WordPress Custom Development & Shopify Developer',
    date: 'Jul 2024 – Jul 2026',
    badge: 'Full-Time (2 Years)',
    logoType: 'icon',
    logoIcon: 'fa-brands fa-wordpress',
    points: [
      'Engineered high-converting Singapore real estate websites with saved-property lead capture architectures.',
      'Built custom WordPress, Webflow, Shopify, and WooCommerce platforms for international clients using Elementor Pro.',
      'Developed full-stack web applications, custom theme features, REST APIs, and database integrations.',
      'Optimized page performance, technical SEO, and site security to achieve fast load times across all devices.',
    ],
  },
]

const EDUCATION = [
  {
    school: 'Urwa Islamic School',
    program: 'Matriculation (Secondary Science Education)',
    year: '2018 – 2020',
    icon: 'fa-solid fa-school',
  },
  {
    school: 'Media Production Art',
    program: 'Web Development Course',
    year: '2020',
    icon: 'fa-solid fa-video',
  },
  {
    school: 'Degree College Hyderabad',
    program: 'Intermediate, Pre-Engineering',
    year: '2020 – 2022',
    icon: 'fa-solid fa-building-columns',
  },
  {
    school: 'Hyderabad Institute for Technology & Management Sciences',
    program: 'BS Software Engineering',
    year: '2025 – Present',
    icon: 'fa-solid fa-graduation-cap',
  },
]

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <Reveal className="section-header center" as="div">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Career Path</div>
          <h2>Work Experience</h2>
          <p>My professional journey spanning full-stack development, WordPress &amp; Webflow CMS engineering, Shopify eCommerce platforms, and backend REST API architecture.</p>
        </Reveal>

        <div className="timeline-alternating">
          <div className="timeline-spine"></div>
          {EXPERIENCE.map((exp, i) => {
            const isLeft = i % 2 === 0
            return (
              <div
                key={`${exp.company}-${exp.role}`}
                className={`timeline-alt-item ${isLeft ? 'item-left' : 'item-right'}`}
              >
                <div className="timeline-node">
                  <span className="timeline-node-dot"></span>
                </div>

                <Reveal
                  delay={i * 0.1}
                  className="timeline-card-wrapper"
                >
                  <div className="timeline-card glass">
                    {/* Top Header: Squircle Logo + Company/Date + Pill Badge */}
                    <div className="timeline-card-header">
                      <div className="timeline-brand-group">
                        <div className="company-logo-squircle">
                          {exp.logoType === 'letter' ? (
                            <span className="company-logo-letter">{exp.logoLetter}</span>
                          ) : (
                            <i className={exp.logoIcon}></i>
                          )}
                        </div>
                        <div className="timeline-company-wrap">
                          <h3>{exp.company}</h3>
                          <span className="timeline-date">{exp.date}</span>
                        </div>
                      </div>
                      {exp.badge && <span className="exp-badge">{exp.badge}</span>}
                    </div>

                    <h4 className="timeline-role-title">{exp.role}</h4>

                    <ul className="timeline-points-list">
                      {exp.points.map((p) => (
                        <li key={p}>
                          <span className="point-bullet-icon" aria-hidden="true">
                            <i className="fa-solid fa-circle-check"></i>
                          </span>
                          <span className="point-text">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            )
          })}
        </div>

        <Reveal className="education-block" as="div">
          <div className="section-header center education-header">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Academic Background</div>
            <h3 className="education-heading">Education</h3>
          </div>
          <div className="education-grid">
            {EDUCATION.map((ed, i) => (
              <Reveal key={ed.school} delay={i * 0.08} className="education-card-wrap">
                <div className="education-card glass">
                  <div className="education-card-top">
                    <div className="edu-icon-squircle">
                      <i className={ed.icon || 'fa-solid fa-graduation-cap'}></i>
                    </div>
                  </div>
                  <div className="education-card-content">
                    <h4 className="edu-school-name">{ed.school}</h4>
                    <p className="edu-program">{ed.program}</p>
                    <span className="edu-year">{ed.year}</span>
                  </div>
                  <div className="edu-action-btn" aria-hidden="true">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
