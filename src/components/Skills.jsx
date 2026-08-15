import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import Reveal from './Reveal'

const FRONTEND_SKILLS = [
  { name: 'React', icon: 'fa-brands fa-react', color: '#61dafb' },
  { name: 'JavaScript', icon: 'fa-brands fa-js', color: '#f7df1e' },
  { name: 'HTML5', icon: 'fa-brands fa-html5', color: '#e34c26' },
  { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: '#264de4' },
  { name: 'Bootstrap', icon: 'fa-brands fa-bootstrap', color: '#7952b3' },
  { name: 'Tailwind CSS', icon: 'fa-solid fa-wind', color: '#38bdf8' },
]

const BACKEND_SKILLS = [
  { name: 'Node.js', icon: 'fa-brands fa-node-js', color: '#68a063' },
  { name: 'Express.js', icon: 'fa-solid fa-server', color: '#38bdf8' },
  { name: 'PHP', icon: 'fa-brands fa-php', color: '#777bb4' },
  { name: 'Python', icon: 'fa-brands fa-python', color: '#3776ab' },
  { name: 'Java', icon: 'fa-brands fa-java', color: '#f89820' },
  { name: 'C++', icon: 'fa-solid fa-code', color: '#00599c' },
  { name: 'MongoDB', icon: 'fa-solid fa-database', color: '#47a248' },
  { name: 'MySQL', icon: 'fa-solid fa-database', color: '#00758f' },
  { name: 'REST APIs', icon: 'fa-solid fa-network-wired', color: '#2563eb' },
]

const CMS_SKILLS = [
  { name: 'WordPress', icon: 'fa-brands fa-wordpress', color: '#21759b' },
  { name: 'Webflow', icon: 'fa-brands fa-webflow', color: '#4353ff' },
  { name: 'Elementor Pro', icon: 'fa-solid fa-layer-group', color: '#92003b' },
  { name: 'Shopify', icon: 'fa-brands fa-shopify', color: '#96bf48' },
  { name: 'WooCommerce', icon: 'fa-solid fa-cart-shopping', color: '#96588a' },
  { name: 'Framer', icon: 'fa-solid fa-bolt', color: '#0055ff' },
]

function DraggableMarqueeRow({ items, direction = 'left', speed = 0.6 }) {
  // Multiply array to ensure infinite wrapping with zero gaps
  const quadItems = [...items, ...items, ...items, ...items, ...items, ...items]
  const x = useMotionValue(0)
  const trackRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    let animationFrameId
    let lastTime = performance.now()

    const step = (time) => {
      const delta = (time - lastTime) / 1000
      lastTime = time

      if (!isDragging && trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth / 2 || 1000
        const moveAmount = speed * 40 * delta
        let currentX = x.get()

        if (direction === 'left') {
          currentX -= moveAmount
          if (currentX <= -trackWidth) {
            currentX += trackWidth
          }
        } else {
          currentX += moveAmount
          if (currentX >= 0) {
            currentX -= trackWidth
          }
        }
        x.set(currentX)
      }

      animationFrameId = requestAnimationFrame(step)
    }

    animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isDragging, direction, speed, x])

  return (
    <div className="skills-marquee-row">
      <motion.div
        ref={trackRef}
        className="skills-marquee-track"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -4000, right: 4000 }}
        dragElastic={0.05}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        {quadItems.map((skill, index) => (
          <div key={`${skill.name}-${index}`} className="marquee-skill-card glass">
            <div className="marquee-skill-icon" style={{ color: skill.color }}>
              <i className={skill.icon}></i>
            </div>
            <span className="marquee-skill-name">{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="skills-marquee-section">
      <div className="container">
        <Reveal className="section-header center" as="div">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Tech Ecosystem</div>
          <h2>Skills &amp; Technologies</h2>
          <p>Full-stack backend, reactive frontends, and high-performance CMS platforms I engineer with.</p>
        </Reveal>
      </div>

      {/* Full-width 3-Row Interactive Marquee Container */}
      <div className="skills-marquee-wrapper">
        <div className="marquee-smoke-fade left" aria-hidden="true"></div>
        <div className="marquee-smoke-fade right" aria-hidden="true"></div>

        {/* Row 1: Front-End (Left Move, Draggable) */}
        <DraggableMarqueeRow items={FRONTEND_SKILLS} direction="left" speed={0.45} />

        {/* Row 2: Back-End & Languages (Right Move, Draggable) */}
        <DraggableMarqueeRow items={BACKEND_SKILLS} direction="right" speed={0.4} />

        {/* Row 3: CMS & E-Commerce (Left Move, Draggable) */}
        <DraggableMarqueeRow items={CMS_SKILLS} direction="left" speed={0.5} />
      </div>
    </section>
  )
}
