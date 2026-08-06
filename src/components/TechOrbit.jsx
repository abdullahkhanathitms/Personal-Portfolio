import { useEffect, useRef } from 'react'

const NODES = [
  { icon: 'fa-brands fa-html5', color: '#e34c26' },
  { icon: 'fa-brands fa-css3-alt', color: '#2965f1' },
  { icon: 'fa-brands fa-js', color: '#f0db4f' },
  { icon: 'fa-brands fa-react', color: '#61dafb' },
  { icon: 'fa-brands fa-bootstrap', color: '#7952b3' },
  { icon: 'fa-brands fa-wordpress', color: '#3591c6' },
  { icon: 'fa-brands fa-shopify', color: '#95bf47' },
  { icon: 'fa-brands fa-node-js', color: '#5fa04e' },
  { icon: 'fa-brands fa-git-alt', color: '#f34f29' },
  { icon: 'fa-solid fa-bolt', color: '#0055ff' }, // Framer (no official FA brand icon)
  { icon: 'fa-brands fa-java', color: '#f89820' },
  { icon: 'fa-brands fa-python', color: '#4b8bbe' },
  { icon: 'fa-brands fa-webflow', color: '#4353ff' },
]

const RADIUS = 165
const PERSPECTIVE = 560
const AUTO_ROTATE_SPEED = 0.0022 // radians/frame — one slow, full rotation
const DRAG_SENSITIVITY = 0.006
const FRICTION = 0.94
const MAX_TILT = 1.1 // clamp vertical tilt so the sphere never fully flips

// Even distribution of points on a sphere (Fibonacci sphere).
function buildNodePositions() {
  const n = NODES.length
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  return NODES.map((node, i) => {
    const y = 1 - (i / (n - 1)) * 2
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = goldenAngle * i
    return {
      ...node,
      x: Math.cos(theta) * radiusAtY * RADIUS,
      y: y * RADIUS,
      z: Math.sin(theta) * radiusAtY * RADIUS,
    }
  })
}

// Connect each node to its nearest neighbours so the lines read as a network.
function buildEdges(points) {
  const edges = []
  const seen = new Set()
  points.forEach((p, i) => {
    const distances = points
      .map((q, j) => ({ j, d: i === j ? Infinity : (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2 }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)

    distances.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (!seen.has(key)) {
        seen.add(key)
        edges.push([i, j])
      }
    })
  })
  return edges
}

const BASE_POINTS = buildNodePositions()
const EDGES = buildEdges(BASE_POINTS)

export default function TechOrbit() {
  const containerRef = useRef(null)
  const iconRefs = useRef([])
  const lineRefs = useRef([])

  const angle = useRef({ x: -0.18, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const dragging = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf
    const size = { w: 0, h: 0 }
    const measure = () => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) { size.w = rect.width; size.h = rect.height }
    }
    measure()
    window.addEventListener('resize', measure)

    const project = (p, ax, ay) => {
      // rotate around Y
      const x1 = p.x * Math.cos(ay) + p.z * Math.sin(ay)
      const z1 = -p.x * Math.sin(ay) + p.z * Math.cos(ay)
      // rotate around X
      const y2 = p.y * Math.cos(ax) - z1 * Math.sin(ax)
      const z2 = p.y * Math.sin(ax) + z1 * Math.cos(ax)

      const scale = PERSPECTIVE / (PERSPECTIVE + z2)
      return { sx: x1 * scale, sy: y2 * scale, scale, z: z2 }
    }

    const tick = () => {
      if (!dragging.current) {
        const speed = Math.abs(velocity.current.x) + Math.abs(velocity.current.y)
        if (speed > 0.00005) {
          angle.current.x += velocity.current.x
          angle.current.y += velocity.current.y
          velocity.current.x *= FRICTION
          velocity.current.y *= FRICTION
        } else if (!reducedMotion.current) {
          angle.current.y += AUTO_ROTATE_SPEED
        }
        angle.current.x = Math.max(-MAX_TILT, Math.min(MAX_TILT, angle.current.x))
      }

      const cx = size.w / 2
      const cy = size.h / 2
      const projected = BASE_POINTS.map((p) => project(p, angle.current.x, angle.current.y))

      projected.forEach((pt, i) => {
        const el = iconRefs.current[i]
        if (!el) return
        const opacity = 0.45 + 0.55 * ((pt.z + RADIUS) / (RADIUS * 2))
        el.style.transform = `translate3d(${cx + pt.sx}px, ${cy + pt.sy}px, 0) translate(-50%, -50%) scale(${pt.scale.toFixed(3)})`
        el.style.opacity = opacity.toFixed(2)
        el.style.zIndex = Math.round(pt.z + RADIUS)
      })

      EDGES.forEach(([a, b], i) => {
        const line = lineRefs.current[i]
        if (!line) return
        const p1 = projected[a]
        const p2 = projected[b]
        line.setAttribute('x1', cx + p1.sx)
        line.setAttribute('y1', cy + p1.sy)
        line.setAttribute('x2', cx + p2.sx)
        line.setAttribute('y2', cy + p2.sy)
        const avgOpacity = ((p1.z + p2.z) / 2 + RADIUS) / (RADIUS * 2)
        line.setAttribute('opacity', (0.12 + 0.28 * avgOpacity).toFixed(2))
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const onPointerDown = (e) => {
    dragging.current = true
    velocity.current = { x: 0, y: 0 }
    lastPointer.current = { x: e.clientX, y: e.clientY }
    containerRef.current?.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!dragging.current) return
    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    angle.current.y += dx * DRAG_SENSITIVITY
    angle.current.x += dy * DRAG_SENSITIVITY
    velocity.current = { x: dy * DRAG_SENSITIVITY * 0.6, y: dx * DRAG_SENSITIVITY * 0.6 }
    lastPointer.current = { x: e.clientX, y: e.clientY }
  }

  const stopDragging = () => { dragging.current = false }

  return (
    <div
      className="tech-orbit"
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onPointerLeave={stopDragging}
      role="img"
      aria-label="Rotating sphere of technology icons — drag to spin"
    >
      <svg className="tech-orbit-lines" aria-hidden="true">
        {EDGES.map(([a, b], i) => (
          <line key={`${a}-${b}`} ref={(el) => (lineRefs.current[i] = el)} />
        ))}
      </svg>

      {BASE_POINTS.map((node, i) => (
        <div
          key={node.icon}
          ref={(el) => (iconRefs.current[i] = el)}
          className="tech-orbit-icon"
          style={{ color: node.color }}
        >
          <i className={node.icon}></i>
        </div>
      ))}
    </div>
  )
}
