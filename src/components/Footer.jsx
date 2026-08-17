import { useApp } from '../contexts/AppContext'
import { content } from '../data/content'

const BridgeIcon = () => (
  <svg width="24" height="16" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 16 C2 16 2 7 14 7 C26 7 26 16 26 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="2" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="9" y1="7" x2="9" y2="16" stroke="currentColor" strokeWidth="1.1" strokeDasharray="2.5 1.5"/>
    <line x1="14" y1="7" x2="14" y2="3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="19" y1="7" x2="19" y2="16" stroke="currentColor" strokeWidth="1.1" strokeDasharray="2.5 1.5"/>
  </svg>
)

export default function Footer() {
  const { lang } = useApp()
  const t = content[lang].footer

  return (
    <footer
      className="py-12 lg:py-16"
      style={{
        background: 'var(--surface-deep)',
        borderTop: '1px solid var(--rim)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-2.5" style={{ color: 'var(--ink-soft)' }}>
            <BridgeIcon />
            <span className="font-display text-lg font-medium text-ink">StoryBridges</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-6">
            {t.links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="ui-text text-xs tracking-widest uppercase transition-colors hover:text-accent"
                style={{ color: 'var(--ink-soft)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copy */}
          <p
            className="ui-text text-xs"
            style={{ color: 'var(--ink-soft)' }}
          >
            {t.copy}
          </p>
        </div>
      </div>
    </footer>
  )
}
