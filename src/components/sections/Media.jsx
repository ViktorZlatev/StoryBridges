import { useApp } from '../../contexts/AppContext'
import { content } from '../../data/content'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function Media() {
  const { lang } = useApp()
  const t = content[lang].media
  const ref = useScrollReveal()

  return (
    <section
      id="media"
      ref={ref}
      className="py-24 lg:py-32"
      style={{ background: 'var(--surface-base)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p data-reveal className="section-label mb-5">{t.label}</p>
          <h2 data-reveal data-delay="2" className="display-lg font-display text-ink mb-6">
            {t.heading}
          </h2>
          <p
            data-reveal
            data-delay="3"
            className="font-body text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: 'var(--ink-mid)' }}
          >
            {t.intro}
          </p>
        </div>

        {/* Media grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.items.map((item, i) => (
            <a
              key={i}
              href={item.url}
              data-reveal
              data-delay={String(i + 1)}
              className="group flex flex-col justify-between p-6 lg:p-7 border rounded-sm transition-all hover:-translate-y-1 hover:shadow-md"
              style={{
                borderColor: 'var(--rim)',
                background: 'var(--surface-card)',
              }}
            >
              <div>
                <div
                  className="ui-text text-xs tracking-widest uppercase mb-4"
                  style={{ color: 'var(--accent)' }}
                >
                  {item.source}
                </div>
                <h3
                  className="font-display text-lg font-medium text-ink leading-snug group-hover:text-accent transition-colors"
                >
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span
                  className="ui-text text-xs"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  {item.date}
                </span>
                <div
                  className="w-6 h-6 flex items-center justify-center rounded-full transition-all group-hover:translate-x-1"
                  style={{ color: 'var(--accent)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M7 7h10v10"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
