const ASSET = '/assets/projects/blue-sky-bubble-demo'

type NavbarProps = {
  onOpenPanel: () => void
  panelOpen: boolean
}

export function Navbar({ onOpenPanel, panelOpen }: NavbarProps) {
  return (
    <header className="bsb-nav">
      <a href="/" className="bsb-nav__logo" aria-label="Back to portfolio home">
        <img src={`${ASSET}/logo.svg`} alt="" width={24} height={24} />
      </a>

      <button
        type="button"
        className="bsb-nav__menu"
        aria-label="Open customize panel"
        aria-expanded={panelOpen}
        onClick={onOpenPanel}
      >
        <img
          src={`${ASSET}/menu-button.svg`}
          alt=""
          width={20}
          height={17}
        />
      </button>
    </header>
  )
}
