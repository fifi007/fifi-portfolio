import { useCallback, useEffect, useState } from 'react'
import { Header } from '../src/components/Header'
import { Footer } from '../src/components/Footer'
import { Loading } from '../src/components/Loading'
import { SmartImage } from '../src/components/SmartImage'
import { criticalImages, projectMeta, showcaseImages } from './data'
import './JxiaozhiPage.css'

export function JxiaozhiPage() {
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
        className="jx-page"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Header />

        <main className="jx-page__main">
          <section className="jx-hero" aria-label="Jxiaozhi project intro">
            <div className="jx-hero__meta">
              <h1 className="jx-hero__title">{projectMeta.title}</h1>

              <p className="jx-hero__label">{projectMeta.typeLabel}</p>
              <p className="jx-hero__value">{projectMeta.type}</p>

              <p className="jx-hero__label">{projectMeta.roleLabel}</p>
              <ul className="jx-hero__roles">
                {projectMeta.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </div>

            <div className="jx-hero__copy">
              <div className="jx-hero__text">
                {projectMeta.descriptionZh.map((paragraph, index) => (
                  <p key={`zh-${index}`}>{paragraph}</p>
                ))}
              </div>
              <div className="jx-hero__text">
                {projectMeta.descriptionEn.map((paragraph, index) => (
                  <p key={`en-${index}`}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="jx-showcase" aria-label="Project showcase">
            {showcaseImages.map((image, index) => (
              <figure key={image.src} className="jx-showcase__item">
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
