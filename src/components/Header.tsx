import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './Header.css'

const resumeLinks = [
  {
    label: '中文简历',
    href: '/assets/resumes/resume-zh.pdf',
    download: '产品设计师_郑小菲简历2026.pdf',
  },
  {
    label: 'English Resume',
    href: '/assets/resumes/resume-en.pdf',
    download: 'product designer_郑小菲FIFI_CV.pdf',
  },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <header className="header">
      <div className="header__inner">
        <a href="/" className="header__logo" aria-label="FIFI Home">
          <img src="/assets/icons/logo.svg" alt="FIFI" width={24} height={24} />
        </a>

        <div className="header__about" ref={menuRef}>
          <button
            type="button"
            className="header__about-btn"
            aria-haspopup="menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            about
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="header__menu"
                role="menu"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {resumeLinks.map((link) => (
                  <a
                    key={link.href}
                    className="header__menu-item"
                    role="menuitem"
                    href={link.href}
                    download={link.download}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
