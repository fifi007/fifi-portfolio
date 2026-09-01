import { useCallback, useState, type ReactElement } from 'react'
import {
  PAYMENT_CLOUD_PATH,
  PaymentCloudPage,
} from '../payment cloud'
import { HONGMIAN_PATH, HongmianPage } from '../hongmian'
import { FAB_PATH, FabPage } from '../fab'
import { FAGILI_PATH, FagiliPage } from '../fagili'
import { OVF_PATH, OvfPage } from '../ovf'
import { PROJECT_123_PATH, Project123Page } from '../123'
import { FAIRY_DEVIL_PATH, FairyAndDevilPage } from '../fairy-and-devil'
import { CRADLE_BABY_PATH, CradleBabyPage } from '../cradle-baby'
import { LONGSHENMI_PATH, LongshenmiPage } from '../longshenmi'
import { WATERCOLOR_PATH, WatercolorPage } from '../watercolor'
import {
  BLUE_SKY_BUBBLE_PATH,
  BlueSkyBubblePage,
} from '../blue-sky-bubble-demo'
import { JXIAOZHI_PATH, JxiaozhiPage } from '../jxiaozhi'
import { HomePage } from './HomePage'

const projectRoutes: Record<string, () => ReactElement> = {
  [PAYMENT_CLOUD_PATH]: () => <PaymentCloudPage />,
  [HONGMIAN_PATH]: () => <HongmianPage />,
  [FAB_PATH]: () => <FabPage />,
  [FAGILI_PATH]: () => <FagiliPage />,
  [OVF_PATH]: () => <OvfPage />,
  [PROJECT_123_PATH]: () => <Project123Page />,
  [FAIRY_DEVIL_PATH]: () => <FairyAndDevilPage />,
  [CRADLE_BABY_PATH]: () => <CradleBabyPage />,
  [LONGSHENMI_PATH]: () => <LongshenmiPage />,
  [WATERCOLOR_PATH]: () => <WatercolorPage />,
  [BLUE_SKY_BUBBLE_PATH]: () => <BlueSkyBubblePage />,
  [JXIAOZHI_PATH]: () => <JxiaozhiPage />,
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
  const ProjectPage = projectRoutes[pathname]

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  if (ProjectPage) {
    return <ProjectPage />
  }

  return (
    <HomePage
      isLoading={isLoading}
      onLoadingComplete={handleLoadingComplete}
    />
  )
}

export default App
