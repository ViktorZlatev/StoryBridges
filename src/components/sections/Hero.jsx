import { useEffect, useRef, useState } from 'react'
import { useApp } from '../../contexts/AppContext'
import { content } from '../../data/content'

export default function Hero() {
  const { lang } = useApp()
  const t = content[lang].hero
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--surface-base)' }}
    >
      {/* Atmospheric background layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 40%, var(--accent-muted) 0%, transparent 60%),
            radial-gradient(ellipse 50% 80% at 10% 80%, var(--surface-alt) 0%, transparent 55%)
          `,
          opacity: 0.55,
        }}
      />

      {/* Large decorative initial */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(16rem, 35vw, 42rem)',
          fontWeight: 600,
          fontStyle: 'italic',
          color: 'var(--rim)',
          opacity: 0.35,
          lineHeight: 1,
          transform: 'translateY(-50%) translateX(15%)',
        }}
      >
        S
      </div>

      {/* Thin horizontal accent rule */}
      <div
        className="absolute left-0 top-1/2 w-16 pointer-events-none"
        style={{ height: '1px', background: 'var(--accent)', opacity: 0.6 }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full pt-28 pb-20">
        {/* Words */}
        <div className="overflow-hidden mb-6">
          <div className="flex flex-wrap gap-x-6 gap-y-0">
            {t.words.map((word, i) => (
              <span
                key={word}
                className="display-xl font-display italic text-ink block"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(100%)',
                  transition: `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.18}s,
                               transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.18}s`,
                  color: i === 2 ? 'var(--accent)' : 'var(--ink)',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="font-body text-lg lg:text-xl text-ink-mid max-w-xl leading-relaxed mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 0.6s, transform 1s ease 0.6s',
          }}
        >
          {t.subtitle}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 0.8s, transform 1s ease 0.8s',
          }}
        >
          <a
            href="#about"
            className="ui-text inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wider uppercase text-white rounded-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: 'var(--accent)', letterSpacing: '0.12em' }}
          >
            {t.cta1}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a
            href="#contact"
            className="ui-text inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wider uppercase rounded-sm border transition-all hover:-translate-y-0.5"
            style={{
              borderColor: 'var(--rim)',
              color: 'var(--ink-mid)',
              letterSpacing: '0.12em',
            }}
          >
            {t.cta2}
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-10 flex items-center gap-3"
          style={{
            opacity: visible ? 0.5 : 0,
            transition: 'opacity 1.5s ease 1.4s',
          }}
        >
          <div
            className="w-px h-14 relative overflow-hidden"
            style={{ background: 'var(--rim)' }}
          >
            <div
              className="absolute top-0 left-0 w-full"
              style={{
                height: '40%',
                background: 'var(--accent)',
                animation: 'scrollDrop 2s ease-in-out infinite',
              }}
            />
          </div>
          <span
            className="ui-text text-xs tracking-widest uppercase"
            style={{
              color: 'var(--ink-soft)',
              writingMode: 'vertical-rl',
              letterSpacing: '0.2em',
            }}
          >
            scroll
          </span>
        </div>
      </div>

      <style>{`
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  )
}
