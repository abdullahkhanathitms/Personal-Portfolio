import { useState, useEffect } from 'react'
import { GITHUB_USER } from '../data/socials'

let cache = null

export function useGithubRepos() {
  const [repos, setRepos] = useState(cache || [])
  const [loading, setLoading] = useState(!cache)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (cache) return
    let cancelled = false

    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`)
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API error')
        return res.json()
      })
      .then((data) => {
        const filtered = data.filter((r) => !r.fork)
        cache = filtered
        if (!cancelled) setRepos(filtered)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  return { repos, loading, error }
}
