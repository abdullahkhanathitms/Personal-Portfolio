import Reveal from './Reveal'

const EXPERIENCE = [
  {
    company: 'Brixq Software House',
    role: 'Frontend & CMS Developer',
    date: '2024 – Present',
    points: [
      'Design, develop and maintain custom WordPress websites for local and international clients across real estate, eCommerce and corporate sectors.',
      'Build responsive interfaces with HTML5, CSS3 and JavaScript, ensuring cross-browser compatibility and a smooth mobile experience.',
      'Implement Elementor Pro layouts and WooCommerce storefronts, including product management and payment integration.',
      'Optimize page load speed and SEO fundamentals to improve search visibility and user engagement.',
      'Collaborate with design and development teams to ship projects on time without compromising UI quality.',
    ],
  },
]

const EDUCATION = [
  { school: 'Hyderabad Institute for Technology & Management Sciences', program: 'BS Software Engineering — 2025 – Present' },
  { school: 'Degree College Hyderabad', program: 'Intermediate, Pre-Engineering — 2023 – 2025' },
]

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <Reveal className="section-header" as="div">
          <div className="eyebrow">Career Path</div>
          <h2>Work Experience</h2>
          <p>Hands-on WordPress and front-end development for real clients — building sites that are fast, responsive and ready to convert.</p>
        </Reveal>

        <div className="timeline">
          {EXPERIENCE.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.08} className="timeline-item">
              <div className="timeline-marker">
                <span className="timeline-dot"></span>
                {i !== EXPERIENCE.length - 1 && <span className="timeline-line"></span>}
              </div>
              <div className="timeline-content glass">
                <div className="timeline-top">
                  <h3>{exp.company}</h3>
                  <span className="timeline-date">{exp.date}</span>
                </div>
                <div className="timeline-role">
                  {exp.role}
                  {exp.badge && <span className="exp-badge">{exp.badge}</span>}
                </div>
                <ul>
                  {exp.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="education-block" as="div">
          <h3 className="education-heading">Education</h3>
          <div className="education-grid">
            {EDUCATION.map((ed) => (
              <div className="education-card glass" key={ed.school}>
                <i className="fa-solid fa-graduation-cap"></i>
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
