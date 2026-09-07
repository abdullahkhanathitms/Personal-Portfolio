import Reveal from './Reveal'

const EXPERIENCE = [
  {
    company: 'Brixq Software House',
    role: 'Web Development Intern',
    date: 'July 2023 – July 2024',
    badge: 'Internship (1 Year)',
    points: [
      'Completed a 1-year intensive web development internship mastering frontend & CMS development.',
      'Created personal portfolio site on WordPress and built 30+ responsive websites and eCommerce stores.',
      'Learned HTML5, CSS3, JavaScript, PHP, WordPress theme customization, and Shopify store setup.',
      'Delivered client-facing frontend projects which led to a full-time developer role at Brixq.',
    ],
  },
  {
    company: 'CodeAlpha',
    role: 'Node.js & Backend Development Intern',
    date: '1 Month Internship',
    badge: 'Internship',
    points: [
      'Engineered backend REST APIs using Node.js, Express.js, and MongoDB database architecture.',
      'Developed ShopCo eCommerce REST API backend handling products, users, and order workflows.',
      'Built a Mini Social Media Platform featuring user profiles, posts, comments, likes, and follower systems with HTML, CSS, JavaScript frontend and Express.js backend.',
    ],
  },
  {
    company: 'Brixq Software House',
    role: 'WordPress Custom Development & Shopify Developer',
    date: 'July 2024 – July 2026',
    badge: 'Full-Time (2 Years)',
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
    program: 'Matriculation (Secondary Science Education) — 2018 – 2020',
    icon: 'fa-solid fa-school',
  },
  {
    school: 'Media Production Art',
    program: 'Web Development Course — 2020',
    icon: 'fa-solid fa-laptop-code',
  },
  {
    school: 'Degree College Hyderabad',
    program: 'Intermediate, Pre-Engineering — 2020 – 2022',
    icon: 'fa-solid fa-building-columns',
  },
  {
    school: 'Hyderabad Institute for Technology & Management Sciences',
    program: 'BS Software Engineering — 2025 – Present',
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
                    <div className="timeline-header">
                      <div className="timeline-company-wrap">
                        <h3>{exp.company}</h3>
                        <span className="timeline-date">{exp.date}</span>
                      </div>
                      {exp.badge && <span className="exp-badge">{exp.badge}</span>}
                    </div>

                    <h4 className="timeline-role-title">{exp.role}</h4>

                    <ul>
                      {exp.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            )
          })}
        </div>

        <Reveal className="education-block" as="div">
          <h3 className="education-heading">Education</h3>
          <div className="education-grid">
            {EDUCATION.map((ed) => (
              <div className="education-card glass" key={ed.school}>
                <i className={ed.icon || 'fa-solid fa-graduation-cap'}></i>
                <div>
                  <h4>{ed.school}</h4>
                  <p>{ed.program}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
