import { useCallback, useEffect, useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Loading } from './Loading'
import './ProjectCasePage.css'

export interface ShowcaseMedia {
  type: 'image' | 'video'
  src: string
  alt: string
}

export interface ShowcaseGrid {
  type: 'grid'
  items: ShowcaseMedia[]
  label?: string
}

export type ShowcaseItem = ShowcaseMedia | ShowcaseGrid

export interface ProjectCaseMeta {
  title: string
  typeLabel?: string
  /** Single-line type, or multi-line under 项目类型 */
  typeDetails?: string[]
  roleLabel?: string
  roles?: string[]
  descriptionZh?: string[]
  descriptionEn?: string[]
}

interface ProjectCasePageProps {
  meta: ProjectCaseMeta
  showcase: ShowcaseItem[]
  ariaLabel: string
}

function isGrid(item: ShowcaseItem): item is ShowcaseGrid {
  return item.type === 'grid'
}

export function ProjectCasePage({
  meta,
  showcase,
  ariaLabel,
}: ProjectCasePageProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  const criticalImages = showcase.flatMap((item) => {
    if (isGrid(item)) {
      return item.items.filter((m) => m.type === 'image').map((m) => m.src)
    }
    return item.type === 'image' ? [item.src] : []
  })

  useEffect(() => {
    const previousBackground = document.body.style.background
    document.body.style.background = '#ffffff'
    window.scrollTo(0, 0)
    return () => {
      document.body.style.background = previousBackground
    }
  }, [])

  const hasMetaDetails =
    Boolean(meta.typeLabel && meta.typeDetails?.length) ||
    Boolean(meta.roleLabel && meta.roles?.length)
  const hasCopy =
    Boolean(meta.descriptionZh?.length) || Boolean(meta.descriptionEn?.length)

  return (
    <>
      {isLoading && (
        <Loading images={criticalImages} onComplete={handleLoadingComplete} />
      )}

      <div
        className="case-page"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Header />

        <main className="case-page__main">
          {(hasMetaDetails || hasCopy) && (
            <section className="case-hero" aria-label={ariaLabel}>
              <div className="case-hero__meta">
                <h1 className="case-hero__title">{meta.title}</h1>

                {meta.typeLabel && meta.typeDetails && meta.typeDetails.length > 0 && (
                  <>
                    <p className="case-hero__label">{meta.typeLabel}</p>
                    <ul className="case-hero__roles">
                      {meta.typeDetails.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </>
                )}

                {meta.roleLabel && meta.roles && meta.roles.length > 0 && (
                  <>
                    <p className="case-hero__label case-hero__label--spaced">
                      {meta.roleLabel}
                    </p>
                    <ul className="case-hero__roles">
                      {meta.roles.map((role) => (
                        <li key={role}>{role}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {hasCopy && (
                <div className="case-hero__copy">
                  {meta.descriptionZh && meta.descriptionZh.length > 0 && (
                    <div className="case-hero__text">
                      {meta.descriptionZh.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                  {meta.descriptionEn && meta.descriptionEn.length > 0 && (
                    <div className="case-hero__text">
                      {meta.descriptionEn.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {!hasMetaDetails && !hasCopy && (
            <section className="case-hero case-hero--title-only" aria-label={ariaLabel}>
              <h1 className="case-hero__title">{meta.title}</h1>
            </section>
          )}

          <section className="case-showcase" aria-label="Project showcase">
            {showcase.map((item) => {
              if (isGrid(item)) {
                return (
                  <div key={item.items.map((i) => i.src).join('|')} className="case-showcase__grid-block">
                    {item.label && (
                      <p className="case-showcase__label">{item.label}</p>
                    )}
                    <div className="case-showcase__grid">
                      {item.items.map((media) => (
                        <figure key={media.src} className="case-showcase__item">
                          {media.type === 'video' ? (
                            <video
                              src={media.src}
                              autoPlay
                              muted
                              loop
                              playsInline
                              aria-label={media.alt}
                            />
                          ) : (
                            <img src={media.src} alt={media.alt} loading="lazy" />
                          )}
                        </figure>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <figure key={item.src} className="case-showcase__item">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={item.alt}
                    />
                  ) : (
                    <img src={item.src} alt={item.alt} loading="lazy" />
                  )}
                </figure>
              )
            })}
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
