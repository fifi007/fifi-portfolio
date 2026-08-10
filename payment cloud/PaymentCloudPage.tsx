import { useCallback, useEffect, useState } from 'react'
import { Header } from '../src/components/Header'
import { Footer } from '../src/components/Footer'
import { Loading } from '../src/components/Loading'
import { SmartImage } from '../src/components/SmartImage'
import { criticalImages, projectMeta, showcaseImages } from './data'
import './PaymentCloudPage.css'

export function PaymentCloudPage() {
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
        className="pc-page"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Header />

        <main className="pc-page__main">
          <section className="pc-hero" aria-label="Payment Cloud project intro">
            <div className="pc-hero__meta">
              <h1 className="pc-hero__title">{projectMeta.title}</h1>

              <p className="pc-hero__label">{projectMeta.typeLabel}</p>
              <p className="pc-hero__value">{projectMeta.type}</p>

              <p className="pc-hero__label">{projectMeta.roleLabel}</p>
              <ul className="pc-hero__roles">
                {projectMeta.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </div>

            <div className="pc-hero__copy">
              <div className="pc-hero__text">
                {projectMeta.descriptionZh.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="pc-hero__text">
                {projectMeta.descriptionEn.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="pc-showcase" aria-label="Project showcase">
            {showcaseImages.map((image, index) => (
              <figure key={image.src} className="pc-showcase__item">
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
