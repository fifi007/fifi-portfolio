import { useState, type ImgHTMLAttributes } from 'react'
import './SmartImage.css'

const LOADING_GIF = '/assets/icons/loading.gif'
const RASTER_EXT = /\.(jpe?g|png)$/i

export interface SmartImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'loading'> {
  src: string
  alt: string
  /** Prefer eager for first visible media on a page. */
  loading?: 'lazy' | 'eager'
  /** Show centered loading.gif until the negotiated image finishes loading. */
  showPlaceholder?: boolean
  className?: string
  pictureClassName?: string
}

function modernSources(src: string) {
  if (!RASTER_EXT.test(src)) {
    return { avif: null, webp: null, original: src }
  }

  const base = src.replace(RASTER_EXT, '')
  const isJpg = /\.jpe?g$/i.test(src)

  return {
    // JPG assets have generated AVIF/WebP siblings; PNG stays original-only.
    avif: isJpg ? `${base}.avif` : null,
    webp: isJpg ? `${base}.webp` : null,
    original: src,
  }
}

export function SmartImage({
  src,
  alt,
  loading = 'lazy',
  showPlaceholder = false,
  className,
  pictureClassName,
  onLoad,
  onError,
  ...imgProps
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false)
  const { avif, webp, original } = modernSources(src)
  const isLazy = loading === 'lazy'
  const usePlaceholder = showPlaceholder && isLazy

  return (
    <span
      className={[
        'smart-image',
        usePlaceholder ? 'smart-image--placeholder' : '',
        loaded ? 'smart-image--loaded' : '',
        pictureClassName,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {usePlaceholder && !loaded && (
        <img
          className="smart-image__spinner"
          src={LOADING_GIF}
          alt=""
          aria-hidden="true"
          draggable={false}
        />
      )}

      <picture className="smart-image__picture">
        {avif && <source srcSet={avif} type="image/avif" />}
        {webp && <source srcSet={webp} type="image/webp" />}
        <img
          {...imgProps}
          className={['smart-image__img', className].filter(Boolean).join(' ')}
          src={original}
          alt={alt}
          loading={loading}
          decoding={isLazy ? 'async' : 'auto'}
          onLoad={(event) => {
            setLoaded(true)
            onLoad?.(event)
          }}
          onError={(event) => {
            setLoaded(true)
            onError?.(event)
          }}
        />
      </picture>
    </span>
  )
}
