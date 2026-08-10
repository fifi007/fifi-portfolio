import { useCallback, useEffect, useState } from 'react'
import { Header } from '../src/components/Header'
import { Footer } from '../src/components/Footer'
import { Loading } from '../src/components/Loading'
import { SmartImage } from '../src/components/SmartImage'
import { criticalImages, projectMeta, showcaseImages } from './data'
import './HongmianPage.css'

export function HongmianPage() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const previousBackground = document.body.style.background
    document.body.style.background = '#ffffff'
    window.scrollTo(0, 0)
    return () => {
      document.body.style.background = previousBackground
    }
  }, [])

  return (
    <>
      {isLoading && (
        <Loading images={criticalImages} onComplete={handleLoadingComplete} />
      )}

      <div
        className="hm-page"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Header />

        <main className="hm-page__main">
          <section className="hm-hero" aria-label="HONGMIAN project intro">
            <div className="hm-hero__meta">
              <h1 className="hm-hero__title">{projectMeta.title}</h1>

              <p className="hm-hero__label">{projectMeta.typeLabel}</p>
              <p className="hm-hero__value">{projectMeta.type}</p>
            </div>

            <div className="hm-hero__copy">
              <div className="hm-hero__text">
                {projectMeta.descriptionZh.map((paragraph, index) => (
                  <p key={`zh-${index}`}>{paragraph}</p>
                ))}
              </div>
              <div className="hm-hero__text">
                {projectMeta.descriptionEn.map((paragraph, index) => (
                  <p key={`en-${index}`}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="hm-showcase" aria-label="Project showcase">
            {showcaseImages.map((image, index) => (
              <figure key={image.src} className="hm-showcase__item">
                <SmartImage
                  src={image.src}
                  alt={image.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  showPlaceholder={index > 0}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                />
              </figure>
            ))}
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
