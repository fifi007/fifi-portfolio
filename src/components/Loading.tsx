import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { criticalImages as homeCriticalImages } from '../data/projects'
import './Loading.css'

interface LoadingProps {
  onComplete: () => void
  /** Override images to preload (defaults to homepage gallery/list assets) */
  images?: string[]
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

export function Loading({ onComplete, images = homeCriticalImages }: LoadingProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let cancelled = false
    const minDisplayTime = 1600
    const startTime = Date.now()

    const finish = () => {
      if (cancelled) return
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minDisplayTime - elapsed)

      window.setTimeout(() => {
        if (cancelled) return
        setIsVisible(false)
        window.setTimeout(onComplete, 500)
      }, remaining)
    }

    Promise.all(images.map(preloadImage)).then(finish)

    return () => {
      cancelled = true
    }
  }, [onComplete, images])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/assets/icons/loading.gif"
            alt="Loading"
            className="loading__gif"
            width={64}
            height={64}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
