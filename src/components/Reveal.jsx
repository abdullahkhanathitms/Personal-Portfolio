import { motion } from 'framer-motion'

/**
 * Reveal — shared scroll-triggered fade/slide-up wrapper.
 * Keeps animation timing consistent across the whole site
 * without repeating IntersectionObserver logic in every section.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 28,
  duration = 0.6,
  once = true,
  amount = 0.2,
  className = '',
  ...rest
}) {
  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
