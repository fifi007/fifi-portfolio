import { useRef } from 'react'
import VariableProximity from './VariableProximity'
import './Hero.css'

const HERO_LABEL =
  "I'm Fifi,a product designer with 8 years of design experience, driven by curiosity.\nRecently building products with Huawei"

export function Hero() {
  const containerRef = useRef<HTMLElement | null>(null)

  return (
    <section className="hero" aria-label="Introduction" ref={containerRef}>
      <h1 className="hero__title">
        <VariableProximity
          label={HERO_LABEL}
          className="hero__proximity"
          fromFontVariationSettings="'wght' 700, 'opsz' 9"
          toFontVariationSettings="'wght' 400, 'opsz' 40"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        />
      </h1>
    </section>
  )
}
