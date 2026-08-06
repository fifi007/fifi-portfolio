import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type RefObject,
} from 'react'
import { motion } from 'framer-motion'
import './VariableProximity.css'

type Falloff = 'linear' | 'exponential' | 'gaussian'

function useAnimationFrame(callback: () => void) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    let frameId = 0
    const loop = () => {
      callbackRef.current()
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [])
}

function useMousePositionRef(containerRef: RefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        positionRef.current = { x: x - rect.left, y: y - rect.top }
      } else {
        positionRef.current = { x, y }
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      updatePosition(event.clientX, event.clientY)
    }
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (touch) updatePosition(touch.clientX, touch.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [containerRef])

  return positionRef
}

export interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string
  fromFontVariationSettings: string
  toFontVariationSettings: string
  containerRef: RefObject<HTMLElement | null>
  radius?: number
  falloff?: Falloff
  className?: string
  onClick?: () => void
  style?: CSSProperties
}

function parseSettings(settingsStr: string) {
  return new Map(
    settingsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        const [name, value] = s.split(/\s+/)
        return [name.replace(/['"]/g, ''), parseFloat(value)] as const
      }),
  )
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (props, ref) => {
    const {
      label,
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 100,
      falloff = 'linear',
      className = '',
      onClick,
      style,
      ...restProps
    } = props

    const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
    const mousePositionRef = useMousePositionRef(containerRef)
    const lastPositionRef = useRef<{ x: number | null; y: number | null }>({
      x: null,
      y: null,
    })

    const parsedSettings = useMemo(() => {
      const fromSettings = parseSettings(fromFontVariationSettings)
      const toSettings = parseSettings(toFontVariationSettings)
      return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: toSettings.get(axis) ?? fromValue,
      }))
    }, [fromFontVariationSettings, toFontVariationSettings])

    const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
      Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

    const calculateFalloff = (distance: number) => {
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1)
      switch (falloff) {
        case 'exponential':
          return norm ** 2
        case 'gaussian':
          return Math.exp(-((distance / (radius / 2)) ** 2) / 2)
        case 'linear':
        default:
          return norm
      }
    }

    useAnimationFrame(() => {
      if (!containerRef.current) return
      const { x, y } = mousePositionRef.current
      if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
        return
      }
      lastPositionRef.current = { x, y }
      const containerRect = containerRef.current.getBoundingClientRect()

      letterRefs.current.forEach((letterRef) => {
        if (!letterRef) return

        const rect = letterRef.getBoundingClientRect()
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top
        const distance = calculateDistance(x, y, letterCenterX, letterCenterY)

        if (distance >= radius) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings
          const fromWght = parsedSettings.find((s) => s.axis === 'wght')
          if (fromWght) {
            letterRef.style.fontWeight = String(Math.round(fromWght.fromValue))
          }
          letterRef.style.transform = 'scale(1)'
          return
        }

        const falloffValue = calculateFalloff(distance)
        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue =
              fromValue + (toValue - fromValue) * falloffValue
            return `'${axis}' ${interpolatedValue}`
          })
          .join(', ')

        letterRef.style.fontVariationSettings = newSettings

        const wght = parsedSettings.find((s) => s.axis === 'wght')
        if (wght) {
          const weight =
            wght.fromValue + (wght.toValue - wght.fromValue) * falloffValue
          // Snap to available Gotham faces while keeping smooth intent
          letterRef.style.fontWeight = String(Math.round(weight))
        }

        // Subtle scale so proximity reads clearly on static Gotham files
        letterRef.style.transform = `scale(${1 + falloffValue * 0.06})`
      })
    })

    const lines = label.split('\n')
    let letterIndex = 0

    return (
      <span
        ref={ref}
        onClick={onClick}
        style={{ display: 'inline', ...style }}
        className={`variable-proximity ${className}`.trim()}
        {...restProps}
      >
        {lines.map((line, lineIndex) => {
          const words = line.split(' ')
          return (
            <span key={lineIndex} className="variable-proximity__line">
              {words.map((word, wordIndex) => (
                <span
                  key={`${lineIndex}-${wordIndex}`}
                  className="variable-proximity__word"
                >
                  {word.split('').map((letter) => {
                    const currentLetterIndex = letterIndex++
                    return (
                      <motion.span
                        key={currentLetterIndex}
                        ref={(el) => {
                          letterRefs.current[currentLetterIndex] = el
                        }}
                        className="variable-proximity__letter"
                        style={{
                          display: 'inline-block',
                          fontVariationSettings: fromFontVariationSettings,
                        }}
                        aria-hidden="true"
                      >
                        {letter}
                      </motion.span>
                    )
                  })}
                  {wordIndex < words.length - 1 && (
                    <span className="variable-proximity__space" aria-hidden="true">
                      &nbsp;
                    </span>
                  )}
                </span>
              ))}
            </span>
          )
        })}
        <span className="sr-only">{label.replace(/\n/g, ' ')}</span>
      </span>
    )
  },
)

VariableProximity.displayName = 'VariableProximity'
export default VariableProximity
