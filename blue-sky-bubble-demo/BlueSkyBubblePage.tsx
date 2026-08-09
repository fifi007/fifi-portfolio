import { useCallback, useEffect, useState } from 'react'
import { CustomizePanel } from './components/CustomizePanel'
import { Hero } from './components/Hero'
import { MetaBallScene } from './components/MetaBallScene'
import { Navbar } from './components/Navbar'
import { NoiseOverlay } from './components/NoiseOverlay'
import { DEFAULT_SETTINGS } from './lib/defaults'
import type { MetaBallSettingKey, MetaBallSettings } from './lib/metaball-settings'
import './BlueSkyBubblePage.css'

const BG = '/assets/projects/blue-sky-bubble-demo/background.jpg'

export function BlueSkyBubblePage() {
  const [panelOpen, setPanelOpen] = useState(false)
  const [settings, setSettings] = useState<MetaBallSettings>(DEFAULT_SETTINGS)

  const handleChange = useCallback(
    <K extends MetaBallSettingKey>(key: K, value: MetaBallSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousBackground = document.body.style.background
    document.body.style.overflow = 'hidden'
    document.body.style.background = '#0a1628'
    window.scrollTo(0, 0)
    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.background = previousBackground
    }
  }, [])

  return (
    <main className="bsb-page">
      <img src={BG} alt="" className="bsb-page__bg" />

      <Hero />
      <NoiseOverlay />
      <MetaBallScene settings={settings} />

      <Navbar
        panelOpen={panelOpen}
        onOpenPanel={() => setPanelOpen((open) => !open)}
      />

      <CustomizePanel
        open={panelOpen}
        settings={settings}
        onClose={() => setPanelOpen(false)}
        onChange={handleChange}
      />
    </main>
  )
}
