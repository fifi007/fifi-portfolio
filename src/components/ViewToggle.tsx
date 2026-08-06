import type { ViewMode } from '../data/types'
import './ViewToggle.css'

interface ViewToggleProps {
  viewMode: ViewMode
  onViewChange: (mode: ViewMode) => void
  showLabel?: boolean
}

export function ViewToggle({
  viewMode,
  onViewChange,
  showLabel = false,
}: ViewToggleProps) {
  return (
    <div className={`view-bar ${showLabel ? 'view-bar--labeled' : ''}`}>
      {showLabel ? (
        <h2 className="view-bar__label">Selected Works</h2>
      ) : (
        <span className="view-bar__spacer" aria-hidden="true" />
      )}

      <div className="view-toggle" role="group" aria-label="View mode">
        <button
          type="button"
          className={`view-toggle__btn ${viewMode === 'gallery' ? 'is-active' : ''}`}
          onClick={() => onViewChange('gallery')}
          aria-pressed={viewMode === 'gallery'}
          aria-label="Gallery view"
        >
          <img
            src={
              viewMode === 'gallery'
                ? '/assets/icons/Gallery_active.svg'
                : '/assets/icons/Gallery_disable.svg'
            }
            alt=""
            width={24}
            height={24}
          />
        </button>
        <button
          type="button"
          className={`view-toggle__btn ${viewMode === 'list' ? 'is-active' : ''}`}
          onClick={() => onViewChange('list')}
          aria-pressed={viewMode === 'list'}
          aria-label="List view"
        >
          <img
            src={
              viewMode === 'list'
                ? '/assets/icons/list_active.svg'
                : '/assets/icons/list_disable.svg'
            }
            alt=""
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  )
}
