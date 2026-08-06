import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ViewToggle } from './components/ViewToggle'
import { ProjectGallery } from './components/ProjectGallery'
import { ProjectList } from './components/ProjectList'
import { Footer } from './components/Footer'
import { Loading } from './components/Loading'
import { listProjects, projects } from './data/projects'
import type { ViewMode } from './data/types'
import './App.css'

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('gallery')
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      {isLoading && <Loading onComplete={handleLoadingComplete} />}

      <div
        className={`page page--${viewMode}`}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Header />

        <main className="page__main">
          <Hero />

          <section className="work" id="work">
            <ViewToggle
              viewMode={viewMode}
              onViewChange={setViewMode}
              showLabel={viewMode === 'list'}
            />

            <div className="work__stage">
              <AnimatePresence mode="wait">
                {viewMode === 'gallery' ? (
                  <motion.div
                    key="gallery"
                    className="work__panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProjectGallery projects={projects} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    className="work__panel"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProjectList projects={listProjects} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
