import { useState } from 'react'
import { useApp } from '../../contexts/AppContext'
import { content } from '../../data/content'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function Consulting() {
  const { lang } = useApp()
  const t = content[lang].consulting
  const ref = useScrollReveal()
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(prev => prev === i ? null : i)

  return (
    <section
      id="consulting"
      ref={ref}
      className="py-24 lg:py-32"
      style={{ background: 'var(--surface-base)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <p data-reveal className="section-label mb-5">{t.label}</p>
          <h2 data-reveal data-delay="2" className="display-lg font-display text-ink mb-6">
            {t.heading}
          </h2>
          <p data-reveal data-delay="3" className="font-body text-base leading-relaxed" style={{ color: 'var(--ink-mid)' }}>
            {t.intro}
          </p>
        </div>

        {/* Services accordion */}
        <div>
          {t.services.map((s, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={s.num}
                data-reveal
                data-delay={String(i + 1)}
                className="border-t"
                style={{ borderColor: 'var(--rim)' }}
              >
                {/* Clickable row */}
                <button
                  className="w-full text-left flex items-start gap-8 lg:gap-16 py-8 group cursor-pointer"
                  onClick={() => toggle(i)}
                >
                  {/* Number */}
                  <span
                    className="font-display text-5xl lg:text-6xl font-medium italic flex-shrink-0 w-16 select-none leading-none transition-colors duration-300"
                    style={{ color: isOpen ? 'var(--accent)' : 'var(--rim)' }}
                  >
                    {s.num}
                  </span>

                  {/* Title only */}
                  <div className="flex-1 pt-2">
                    <h3
                      className="font-display text-xl lg:text-2xl font-medium transition-colors duration-300"
                      style={{ color: isOpen ? 'var(--accent)' : 'var(--ink)' }}
                    >
                      {s.title}
                    </h3>
                  </div>

                  {/* Toggle icon */}
                  <div
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center mt-2 rounded-full border transition-all duration-300"
                    style={{
                      borderColor: isOpen ? 'var(--accent)' : 'var(--rim)',
                      color: isOpen ? 'var(--accent)' : 'var(--ink-soft)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </div>
                </button>

                {/* Expanded detail */}
                <div
                  style={{
                    maxHeight: isOpen ? '240px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div
                    className="pb-8 pl-24 lg:pl-32 border-t"
                    style={{ borderColor: 'var(--rim)' }}
                  >
                    <p
                      className="font-body text-base font-medium leading-relaxed max-w-2xl pt-6 mb-3"
                      style={{ color: 'var(--ink)' }}
                    >
                      {s.desc}
                    </p>
                    <p
                      className="font-body text-base leading-relaxed max-w-2xl"
                      style={{ color: 'var(--ink-mid)' }}
                    >
                      {s.details}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
          {/* Bottom border */}
          <div className="border-t" style={{ borderColor: 'var(--rim)' }} />
        </div>

        {/* CTA */}
        <div data-reveal data-delay="6" className="mt-16 text-center">
          <a
            href="#contact"
            className="ui-text inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold tracking-wider uppercase rounded-sm transition-all hover:-translate-y-0.5 hover:shadow-lg text-white"
            style={{ background: 'var(--accent)', letterSpacing: '0.12em' }}
          >
            {lang === 'bg' ? 'Свържи се за консултация' : 'Get in touch for consulting'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
