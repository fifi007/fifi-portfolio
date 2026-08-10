import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { Project } from '../data/types'
import { SmartImage } from './SmartImage'
import './ProjectGallery.css'

interface ProjectGalleryProps {
  projects: Project[]
}

/** Figma Image slider artboard */
const BOARD_WIDTH = 2600
const BOARD_HEIGHT = 460
const BASE_SPEED = 0.52 // px per frame at 60fps — slightly faster crawl
const MAX_EDGE_SPEED = 4.8
const EDGE_ZONE = 0.18 // 18% of viewport on each side

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}

function edgeBoost(clientX: number, viewportWidth: number) {
  const leftBound = viewportWidth * EDGE_ZONE
  const rightBound = viewportWidth * (1 - EDGE_ZONE)

  if (clientX < leftBound) {
    const t = 1 - clientX / leftBound
    return -(BASE_SPEED + t * t * MAX_EDGE_SPEED)
  }

  if (clientX > rightBound) {
    const t = (clientX - rightBound) / (viewportWidth - rightBound)
    return BASE_SPEED + t * t * MAX_EDGE_SPEED
  }

  return BASE_SPEED
}

function normalizeOffset(offset: number) {
  let next = offset
  while (next <= -BOARD_WIDTH) next += BOARD_WIDTH
  while (next > 0) next -= BOARD_WIDTH
  return next
}

function touchMidX(touches: TouchList) {
  return (touches[0].clientX + touches[1].clientX) / 2
}

function GalleryBoard({
  projects,
  clone,
  hoveredId,
  onHover,
}: {
  projects: Project[]
  clone: boolean
  hoveredId: string | null
  onHover: (id: string | null) => void
}) {
  return (
    <div
      className="slider-board"
      style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT }}
      aria-hidden={clone}
    >
      {projects.map((project) => {
        const key = `${project.id}-${clone ? 'b' : 'a'}`
        const isHovered = hoveredId === key

        return (
          <motion.a
            key={key}
            href={project.href ?? `#${project.id}`}
            className={`slider-card slider-card--${project.size}`}
            style={{
              left: project.x,
              top: project.y,
              width: project.width,
              height: project.height,
              ['--float-delay' as string]: `${(project.x % 7) * 0.25}s`,
            }}
            tabIndex={clone ? -1 : 0}
            onMouseEnter={() => onHover(key)}
            onMouseLeave={() => onHover(null)}
            initial={false}
            animate={
              isHovered
                ? { rotate: -project.rotation, scale: 1.06, zIndex: 20 }
                : { rotate: 0, scale: 1, zIndex: 1 }
            }
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="slider-card__float">
              <SmartImage
                src={project.image}
                alt={clone ? '' : project.title}
                className="slider-card__image"
                width={project.width * 2}
                height={project.height * 2}
                draggable={false}
                loading={clone ? 'lazy' : 'eager'}
              />
            </div>
          </motion.a>
        )
      })}
    </div>
  )
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const reducedMotion = usePrefersReducedMotion()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [isPinchDragging, setIsPinchDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const offsetRef = useRef(0)
  const speedRef = useRef(BASE_SPEED)
  const targetSpeedRef = useRef(BASE_SPEED)
  const pausedRef = useRef(false)
  const rafRef = useRef(0)
  const pinchDraggingRef = useRef(false)
  const pinchStartXRef = useRef(0)
  const pinchStartOffsetRef = useRef(0)
  const scaleRef = useRef(scale)
  const hoveredIdRef = useRef(hoveredId)
  const reducedMotionRef = useRef(reducedMotion)

  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)
  const springX = useSpring(parallaxX, { stiffness: 40, damping: 20 })
  const springY = useSpring(parallaxY, { stiffness: 40, damping: 20 })

  const orderedProjects = useMemo(
    () => [...projects].sort((a, b) => a.x - b.x || a.y - b.y),
    [projects],
  )

  useEffect(() => {
    scaleRef.current = scale
  }, [scale])

  useEffect(() => {
    hoveredIdRef.current = hoveredId
  }, [hoveredId])

  useEffect(() => {
    reducedMotionRef.current = reducedMotion
  }, [reducedMotion])

  useEffect(() => {
    const updateScale = () => {
      const available = Math.min(window.innerWidth, 1600)
      setScale(Math.min(1, Math.max(0.42, available / 1440)))
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  useEffect(() => {
    pausedRef.current =
      Boolean(hoveredId) || reducedMotion || pinchDraggingRef.current
  }, [hoveredId, reducedMotion])

  useEffect(() => {
    if (reducedMotion) return

    const handleMove = (event: MouseEvent) => {
      if (pinchDraggingRef.current) return

      const nx = (event.clientX / window.innerWidth - 0.5) * 2
      const ny = (event.clientY / window.innerHeight - 0.5) * 2
      parallaxX.set(nx * 10)
      parallaxY.set(ny * 6)
      targetSpeedRef.current = edgeBoost(event.clientX, window.innerWidth)
    }

    const handleLeave = () => {
      if (!pinchDraggingRef.current) {
        targetSpeedRef.current = BASE_SPEED
      }
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [parallaxX, parallaxY, reducedMotion])

  useEffect(() => {
    if (reducedMotion) return

    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(32, now - last) / 16.666
      last = now

      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.08

      if (!pausedRef.current && trackRef.current) {
        offsetRef.current = normalizeOffset(
          offsetRef.current - speedRef.current * dt,
        )
        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [reducedMotion])

  // Mobile only: two-finger drag. Desktop stays clickable with no drag.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const applyOffset = (next: number) => {
      offsetRef.current = normalizeOffset(next)
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
      }
    }

    const beginPinchDrag = (touches: TouchList) => {
      pinchDraggingRef.current = true
      pausedRef.current = true
      setIsPinchDragging(true)
      pinchStartXRef.current = touchMidX(touches)
      pinchStartOffsetRef.current = offsetRef.current
    }

    const endPinchDrag = () => {
      if (!pinchDraggingRef.current) return
      pinchDraggingRef.current = false
      setIsPinchDragging(false)
      pausedRef.current =
        Boolean(hoveredIdRef.current) || reducedMotionRef.current
    }

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        beginPinchDrag(event.touches)
      }
    }

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length < 2) {
        if (pinchDraggingRef.current) endPinchDrag()
        return
      }

      if (!pinchDraggingRef.current) {
        beginPinchDrag(event.touches)
      }

      event.preventDefault()
      const midX = touchMidX(event.touches)
      const dx = midX - pinchStartXRef.current
      applyOffset(
        pinchStartOffsetRef.current + dx / Math.max(scaleRef.current, 0.01),
      )
    }

    const onTouchEnd = (event: TouchEvent) => {
      if (event.touches.length < 2) {
        endPinchDrag()
      }
    }

    section.addEventListener('touchstart', onTouchStart, { passive: true })
    section.addEventListener('touchmove', onTouchMove, { passive: false })
    section.addEventListener('touchend', onTouchEnd)
    section.addEventListener('touchcancel', onTouchEnd)

    return () => {
      section.removeEventListener('touchstart', onTouchStart)
      section.removeEventListener('touchmove', onTouchMove)
      section.removeEventListener('touchend', onTouchEnd)
      section.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`floating-gallery${isPinchDragging ? ' floating-gallery--pinch-dragging' : ''}`}
      aria-label="Project gallery"
      style={{
        height: BOARD_HEIGHT * scale,
        minHeight: BOARD_HEIGHT * scale,
      }}
    >
      <motion.div
        className="floating-gallery__parallax"
        style={{ x: springX, y: springY }}
      >
        <div
          className="floating-gallery__scaler"
          style={{
            width: BOARD_WIDTH * 2 * scale,
            height: BOARD_HEIGHT * scale,
          }}
        >
          <div
            className="floating-gallery__scale-inner"
            style={{
              width: BOARD_WIDTH * 2,
              height: BOARD_HEIGHT,
              transform: `scale(${scale})`,
            }}
          >
            <div ref={trackRef} className="floating-gallery__track">
              <GalleryBoard
                projects={orderedProjects}
                clone={false}
                hoveredId={hoveredId}
                onHover={setHoveredId}
              />
              <GalleryBoard
                projects={orderedProjects}
                clone
                hoveredId={hoveredId}
                onHover={setHoveredId}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
