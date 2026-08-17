import { useApp } from '../../contexts/AppContext'
import { content } from '../../data/content'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function Testimonials() {
  const { lang } = useApp()
  const t = content[lang].testimonials
  const ref = useScrollReveal()

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'var(--surface-deep)' }}
    >
      {/* Decorative large quote mark */}
      <div
        className="absolute top-8 left-8 select-none pointer-events-none font-display leading-none"
        style={{
          fontSize: '20rem',
          color: 'var(--rim)',
          opacity: 0.3,
          lineHeight: 1,
          fontStyle: 'italic',
        }}
      >
        "
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="text-center mb-16">
          <p data-reveal className="section-label mb-5">{t.label}</p>
          <h2 data-reveal data-delay="2" className="display-md font-display text-ink">
            {t.heading}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {t.items.map((item, i) => (
            <div
              key={i}
              data-reveal
              data-delay={String(i + 1)}
              className="p-8 lg:p-10 border rounded-sm"
              style={{
                borderColor: 'var(--rim)',
                background: 'var(--surface-card)',
              }}
            >
              <p
                className="font-body text-base leading-relaxed italic mb-8"
                style={{ color: 'var(--ink-mid)' }}
              >
                {item.text}
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--accent-muted)' }}
                >
                  <span
                    className="font-display text-lg font-medium"
                    style={{ color: 'var(--accent)' }}
                  >
                    {item.name[0]}
                  </span>
                </div>
                <div>
                  <div className="font-body text-sm font-medium text-ink">{item.name}</div>
                  <div className="ui-text text-xs" style={{ color: 'var(--ink-soft)' }}>
                    {item.role}, {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
