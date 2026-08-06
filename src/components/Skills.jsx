import { motion } from 'framer-motion'
import Reveal from './Reveal'

const SKILL_GROUPS = [
  {
    category: 'Front-End Development',
    icon: 'fa-solid fa-laptop-code',
    skills: [
      { name: 'HTML5', icon: 'fa-brands fa-html5', level: 95, tier: 'Expert' },
      { name: 'CSS3', icon: 'fa-brands fa-css3-alt', level: 92, tier: 'Expert' },
      { name: 'JavaScript', icon: 'fa-brands fa-js', level: 85, tier: 'Advanced' },
      { name: 'Bootstrap', icon: 'fa-brands fa-bootstrap', level: 88, tier: 'Advanced' },
      { name: 'React', icon: 'fa-brands fa-react', level: 72, tier: 'Intermediate' },
      { name: 'Responsive Design', icon: 'fa-solid fa-mobile-screen', level: 93, tier: 'Expert' },
    ],
  },
  {
    category: 'WordPress & CMS',
    icon: 'fa-brands fa-wordpress',
    skills: [
      { name: 'WordPress Development', icon: 'fa-brands fa-wordpress', level: 95, tier: 'Expert' },
      { name: 'Elementor Pro', icon: 'fa-solid fa-layer-group', level: 92, tier: 'Expert' },
      { name: 'WooCommerce', icon: 'fa-solid fa-cart-shopping', level: 85, tier: 'Advanced' },
      { name: 'Shopify', icon: 'fa-brands fa-shopify', level: 68, tier: 'Intermediate' },
      { name: 'Webflow', icon: 'fa-solid fa-code-branch', level: 62, tier: 'Intermediate' },
      { name: 'Framer', icon: 'fa-solid fa-bolt', level: 70, tier: 'Intermediate' },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <Reveal className="section-header center" as="div">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>What I Work With</div>
          <h2>Skills &amp; Toolkit</h2>
          <p>The stack I use to turn a brief into a live, responsive website — from hand-written front-end code to WordPress builds ready for real clients.</p>
        </Reveal>

        <div className="skills-groups">
          {SKILL_GROUPS.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.1} className="skill-group-card glass">
              <div className="skill-group-header">
                <div className="skill-group-icon"><i className={group.icon}></i></div>
                <h3>{group.category}</h3>
              </div>

              <div className="skill-list">
                {group.skills.map((skill, si) => (
                  <div className="skill-row" key={skill.name}>
                    <div className="skill-row-top">
                      <span className="skill-name"><i className={skill.icon}></i>{skill.name}</span>
                      <span className="skill-tier">{skill.tier}</span>
                    </div>
                    <div className="skill-bar-track">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 1, delay: si * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
