import { useState, useEffect } from 'react'
import { useApp } from '../contexts/AppContext'
import { content } from '../data/content'

const BridgeIcon = () => (
  <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 16 C2 16 2 7 14 7 C26 7 26 16 26 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="2" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="9" y1="7" x2="9" y2="16" stroke="currentColor" strokeWidth="1.1" strokeDasharray="2.5 1.5"/>
    <line x1="14" y1="7" x2="14" y2="3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="19" y1="7" x2="19" y2="16" stroke="currentColor" strokeWidth="1.1" strokeDasharray="2.5 1.5"/>
  </svg>
)

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

export default function Navbar() {
  const { theme, toggleTheme, lang, toggleLang } = useApp()
  const t = content[lang].nav
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['home', 'about', 'consulting', 'training', 'media', 'contact']
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.3 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const links = [
    { id: 'home',       label: t.home       },
    { id: 'about',      label: t.about      },
    { id: 'consulting', label: t.consulting  },
    { id: 'training',   label: t.training   },
    { id: 'media',      label: t.media      },
    { id: 'contact',    label: t.contact    },
  ]

  const navBg = scrolled
    ? 'bg-surface-base/95 backdrop-blur-md shadow-sm'
    : 'bg-transparent'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      style={{ borderBottom: scrolled ? '1px solid var(--rim)' : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group" onClick={() => setMenuOpen(false)}>
          <span className="text-accent transition-transform group-hover:scale-105">
            <BridgeIcon />
          </span>
          <span className="font-display text-xl font-medium tracking-tight text-ink">
            StoryBridges
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`ui-text text-xs font-medium tracking-widest uppercase transition-colors
                ${active === id ? 'text-accent' : 'text-ink-mid hover:text-ink'}`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="ui-text text-xs font-semibold tracking-widest uppercase px-2.5 py-1.5
                       border rounded-sm text-ink-mid hover:text-ink hover:border-ink transition-colors"
            style={{ borderColor: 'var(--rim)' }}
            aria-label="Toggle language"
          >
            {lang === 'bg' ? 'EN' : 'BG'}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-sm text-ink-mid hover:text-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-1 text-ink"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}
        style={{ background: 'var(--surface-base)', borderTop: '1px solid var(--rim)' }}
      >
        <nav className="px-6 py-4 flex flex-col gap-4">
          {links.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              className={`ui-text text-sm font-medium tracking-widest uppercase py-1
                ${active === id ? 'text-accent' : 'text-ink-mid'}`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
