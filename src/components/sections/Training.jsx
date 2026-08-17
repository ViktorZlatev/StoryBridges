import { useState } from 'react'
import { useApp } from '../../contexts/AppContext'
import { content } from '../../data/content'
import { useScrollReveal } from '../../hooks/useScrollReveal'

function TrainingCard({ item, lang, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      data-reveal
      data-delay={String(index + 1)}
      className="border rounded-2xl overflow-hidden"
      style={{
        borderColor: open ? 'var(--accent)' : 'var(--rim)',
        background: 'var(--surface-card)',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Header */}
      <button
        className="w-full text-left p-6 lg:p-8 flex items-start justify-between gap-4 group"
        onClick={() => setOpen(o => !o)}
      >
        <div>
          <p
            className="ui-text text-xs tracking-widest uppercase mb-2"
            style={{ color: 'var(--accent)' }}
          >
            {item.tagline}
          </p>
          <h3
            className="font-display text-xl lg:text-2xl font-medium text-ink group-hover:text-accent transition-colors"
          >
            {item.title}
          </h3>
        </div>
        <div
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border mt-1 transition-all"
          style={{
            borderColor: open ? 'var(--accent)' : 'var(--rim)',
            color: open ? 'var(--accent)' : 'var(--ink-soft)',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
      </button>

      {/* Expanded content */}
      <div
        style={{
          maxHeight: open ? '600px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="px-6 lg:px-8 pb-8 pt-0 border-t"
          style={{ borderColor: 'var(--rim)' }}
        >
          <p
            className="font-body text-sm leading-relaxed mt-6 mb-6"
            style={{ color: 'var(--ink-mid)' }}
          >
            {item.desc}
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {item.questions.length > 0 && (
              <div>
                <p
                  className="ui-text text-xs tracking-widest uppercase mb-4"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  {lang === 'bg' ? 'Ключови въпроси' : 'Key questions'}
                </p>
                <div className="space-y-2">
                  {item.questions.map((q, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 font-body text-sm"
                      style={{ color: 'var(--ink-mid)' }}
                    >
                      <span
                        className="flex-shrink-0 font-display italic text-base"
                        style={{ color: 'var(--accent)', lineHeight: '1.5' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p
                className="ui-text text-xs tracking-widest uppercase mb-4"
                style={{ color: 'var(--ink-soft)' }}
              >
                {lang === 'bg' ? 'Какво ще получиш' : 'What you gain'}
              </p>
              <div className="space-y-2">
                {item.benefits.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 font-body text-sm"
                    style={{ color: 'var(--ink-mid)' }}
                  >
                    <span
                      className="flex-shrink-0 w-1 h-1 rounded-full mt-2.5"
                      style={{ background: 'var(--accent)' }}
                    />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <a
              href={item.url || '#contact'}
              target={item.url ? '_blank' : undefined}
              rel={item.url ? 'noopener noreferrer' : undefined}
              className="ui-text inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider uppercase rounded-sm text-white transition-all hover:-translate-y-0.5"
              style={{ background: 'var(--accent)', letterSpacing: '0.12em' }}
            >
              {item.cta}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Training() {
  const { lang } = useApp()
  const t = content[lang].training
  const ref = useScrollReveal()

  return (
    <section
      id="training"
      ref={ref}
      className="py-24 lg:py-32"
      style={{ background: 'var(--surface-alt)' }}
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

        {/* Open trainings */}
        <div className="mb-16">
          <h3 data-reveal className="font-display text-2xl font-medium italic text-ink mb-8">
            {t.open.heading}
          </h3>
          <div className="space-y-4">
            {t.open.items.map((item, i) => (
              <TrainingCard key={item.id} item={item} lang={lang} index={i} />
            ))}
          </div>
        </div>

        {/* Corporate trainings */}
        <div>
          <h3 data-reveal className="font-display text-2xl font-medium italic text-ink mb-8">
            {t.corporate.heading}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.corporate.items.map((item, i) => (
              <div
                key={item.id}
                data-reveal
                data-delay={String(i + 1)}
                className="p-6 lg:p-8 border rounded-2xl"
                style={{
                  borderColor: 'var(--rim)',
                  background: 'var(--surface-card)',
                }}
              >
                <h4 className="font-display text-xl font-medium text-ink mb-4">
                  {item.title}
                </h4>
                <div className="w-6 h-px mb-4" style={{ background: 'var(--accent)' }} />
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--ink-mid)' }}>
                  {item.desc}
                </p>
                <div className="mt-6">
                  <a
                    href="#contact"
                    className="ui-text text-xs font-semibold tracking-widest uppercase inline-flex items-center gap-2 transition-colors hover:gap-3"
                    style={{ color: 'var(--accent)' }}
                  >
                    {lang === 'bg' ? 'Научи повече' : 'Learn more'}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
