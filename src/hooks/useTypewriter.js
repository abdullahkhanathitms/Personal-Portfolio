import { useState, useEffect, useRef } from 'react'

/**
 * useTypewriter — types out a phrase (or cycles through several, if `loop`
 * is true). Respects prefers-reduced-motion by just showing the first
 * phrase statically instead of animating.
 */
export function useTypewriter(words, { typingSpeed = 70, deletingSpeed = 40, pauseTime = 1600, loop = true } = {}) {
  const [text, setText] = useState('')
  const indexRef = useRef(0)
  const charRef = useRef(0)
  const deletingRef = useRef(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setText(words[0] || '')
      return
    }

    let timeoutId

    const tick = () => {
      const current = words[indexRef.current % words.length]

      if (!deletingRef.current) {
        charRef.current += 1
        setText(current.slice(0, charRef.current))

        if (charRef.current === current.length) {
          if (!loop) return // one-shot: type once and stop, no delete/cycle
          deletingRef.current = true
          timeoutId = setTimeout(tick, pauseTime)
          return
        }
        timeoutId = setTimeout(tick, typingSpeed)
      } else {
        charRef.current -= 1
        setText(current.slice(0, charRef.current))

        if (charRef.current === 0) {
          deletingRef.current = false
          indexRef.current += 1
          timeoutId = setTimeout(tick, 300)
          return
        }
        timeoutId = setTimeout(tick, deletingSpeed)
      }
    }

    timeoutId = setTimeout(tick, 500)
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return text
}
