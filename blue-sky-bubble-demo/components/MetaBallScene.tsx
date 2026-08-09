import { lazy, Suspense } from 'react'
import type { MetaBallSettings } from '../lib/metaball-settings'

const MetaBalls = lazy(() => import('./MetaBalls'))

type MetaBallSceneProps = {
  settings: MetaBallSettings
}

export function MetaBallScene({ settings }: MetaBallSceneProps) {
  return (
    <div className="bsb-scene">
      <div className="bsb-scene__stack">
        <Suspense fallback={null}>
          <MetaBalls {...settings} />
        </Suspense>
      </div>
    </div>
  )
}
