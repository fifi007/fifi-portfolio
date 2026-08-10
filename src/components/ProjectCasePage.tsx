import { useCallback, useEffect, useRef, useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Loading } from './Loading'
import { SmartImage } from './SmartImage'
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

function CaseVideo({ src, alt }: { src: string; alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showControls, setShowControls] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: coarse)').matches
      : false,
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.setAttribute('x5-playsinline', '')
    video.setAttribute('x5-video-player-type', 'h5')

    const tryPlay = () => {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setShowControls(true)
        })
      }
    }

    const onLoaded = () => tryPlay()
    video.addEventListener('loadeddata', onLoaded)

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          tryPlay()
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(video)

    tryPlay()

    return () => {
      video.removeEventListener('loadeddata', onLoaded)
      observer.disconnect()
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      className="case-showcase__video"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      controls={showControls}
      controlsList="nodownload"
      aria-label={alt}
    />
  )
}

function CaseImage({
  src,
  alt,
  isFirst,
}: {
  src: string
  alt: string
  isFirst: boolean
}) {
  return (
    <SmartImage
      src={src}
      alt={alt}
      loading={isFirst ? 'eager' : 'lazy'}
      showPlaceholder={!isFirst}
      fetchPriority={isFirst ? 'high' : 'auto'}
    />
  )
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

  let imageOrdinal = 0

  return (
    <>
      {isLoading && (
        <Loading images={criticalImages.slice(0, 1)} onComplete={handleLoadingComplete} />
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
                      {meta.descriptionZh.map((paragraph, index) => (
                        <p key={`zh-${index}`}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                  {meta.descriptionEn && meta.descriptionEn.length > 0 && (
                    <div className="case-hero__text">
                      {meta.descriptionEn.map((paragraph, index) => (
                        <p key={`en-${index}`}>{paragraph}</p>
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
                      {item.items.map((media) => {
                        if (media.type === 'video') {
                          return (
                            <figure key={media.src} className="case-showcase__item">
                              <CaseVideo src={media.src} alt={media.alt} />
                            </figure>
                          )
                        }

                        const isFirst = imageOrdinal === 0
                        imageOrdinal += 1
                        return (
                          <figure key={media.src} className="case-showcase__item">
                            <CaseImage src={media.src} alt={media.alt} isFirst={isFirst} />
                          </figure>
                        )
                      })}
                    </div>
                  </div>
                )
              }

              if (item.type === 'video') {
                return (
                  <figure key={item.src} className="case-showcase__item">
                    <CaseVideo src={item.src} alt={item.alt} />
                  </figure>
                )
              }

              const isFirst = imageOrdinal === 0
              imageOrdinal += 1
              return (
                <figure key={item.src} className="case-showcase__item">
                  <CaseImage src={item.src} alt={item.alt} isFirst={isFirst} />
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
