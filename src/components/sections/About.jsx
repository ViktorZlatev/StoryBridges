import aneliaPhoto from '../../assets/anelia.png'
import { useApp } from '../../contexts/AppContext'
import { content } from '../../data/content'
import { useScrollReveal } from '../../hooks/useScrollReveal'

function Stat({ value, label, delay }) {
  return (
    <div data-reveal data-delay={delay} className="text-center">
      <div
        className="font-display text-5xl lg:text-6xl font-medium italic mb-1"
        style={{ color: 'var(--accent)' }}
      >
        {value}
      </div>
      <div
        className="ui-text text-xs tracking-widest uppercase"
        style={{ color: 'var(--ink-soft)' }}
      >
        {label}
      </div>
    </div>
  )
}

export default function About() {
  const { lang } = useApp()
  const t = content[lang]
  const phi = t.philosophy
  const anelia = t.anelia
  const about = t.about

  const phiRef = useScrollReveal()
  const aneliaRef = useScrollReveal()
  const fullRef = useScrollReveal()

  return (
    <>
      {/* ── Philosophy bridge section ── */}
      <section
        ref={phiRef}
        className="py-24 lg:py-32"
        style={{ background: 'var(--surface-alt)' }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p data-reveal className="section-label mb-5">{phi.label}</p>
          <h2 data-reveal data-delay="2" className="display-md font-display text-ink mb-8">
            {phi.heading}
          </h2>
          <div data-reveal data-delay="3" className="bridge-rule mb-8" />
          <p
            data-reveal
            data-delay="4"
            className="font-body text-lg leading-relaxed"
            style={{ color: 'var(--ink-mid)' }}
          >
            {phi.text}
          </p>
        </div>
      </section>

      {/* ── Anelia intro ── */}
      <section
        ref={aneliaRef}
        className="py-24 lg:py-32"
        style={{ background: 'var(--surface-base)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text */}
            <div>
              <p data-reveal className="section-label mb-5">{anelia.label}</p>
              <h2 data-reveal data-delay="2" className="display-md font-display text-ink mb-2">
                {anelia.name}
              </h2>
              <p
                data-reveal
                data-delay="3"
                className="ui-text text-sm tracking-widest uppercase mb-8"
                style={{ color: 'var(--accent)' }}
              >
                {anelia.tagline}
              </p>
              <p
                data-reveal
                data-delay="4"
                className="font-body text-base leading-relaxed mb-8"
                style={{ color: 'var(--ink-mid)' }}
              >
                {anelia.bio}
              </p>

              {/* Companies */}
              <div data-reveal data-delay="5">
                <p
                  className="ui-text text-xs tracking-widest uppercase mb-4"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  {lang === 'bg' ? 'Опит в' : 'Experience at'}
                </p>
                <div className="flex flex-col gap-2">
                  {anelia.companies.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 font-body text-sm"
                      style={{ color: 'var(--ink-mid)' }}
                    >
                      <span
                        className="inline-block w-4 h-px"
                        style={{ background: 'var(--accent)' }}
                      />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats + avatar placeholder */}
            <div className="flex flex-col gap-12">
              {/* Photo */}
              <div
                data-reveal
                data-delay="2"
                className="relative w-80 h-80 mx-auto overflow-hidden"
                style={{ borderRadius: '6rem', background: 'var(--surface-alt)' }}
              >
                <img
                  src={aneliaPhoto}
                  alt="Анелия Недин"
                  className="w-full h-full object-cover object-top"
                />
                {/* Decorative corner accent */}
                <div
                  className="absolute bottom-0 right-0 w-16 h-16"
                  style={{
                    background: 'var(--accent)',
                    opacity: 0.15,
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                  }}
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {anelia.stats.map((s, i) => (
                  <Stat key={i} value={s.value} label={s.label} delay={String(i + 2)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full About section ── */}
      <section
        id="about"
        ref={fullRef}
        className="py-24 lg:py-32"
        style={{ background: 'var(--surface-alt)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p data-reveal className="section-label mb-5 text-center">{about.label}</p>

          <div className="grid lg:grid-cols-3 gap-8 mt-16 items-start">
            {[
              { heading: about.story.heading,      text: about.story.text,      delay: '1' },
              { heading: about.mission.heading,    text: about.mission.text,    delay: '2' },
              { heading: about.philosophy.heading, text: about.philosophy.text, delay: '3' },
            ].map((card, i) => (
              <div
                key={i}
                data-reveal
                data-delay={card.delay}
                className="group p-7 lg:p-8 border cursor-default transition-transform duration-300 hover:scale-[1.03]"
                style={{
                  borderColor: 'var(--ink)',
                  background: 'transparent',
                  borderRadius: '4px',
                }}
              >
                <h3 className="font-display text-2xl font-medium italic mb-4 text-ink">
                  {card.heading}
                </h3>
                <div
                  className="h-px mb-6 w-8 group-hover:w-16 transition-all duration-300"
                  style={{ background: 'var(--accent)' }}
                />
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--ink-mid)' }}>
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          {/* Experience timeline */}
          <div data-reveal data-delay="2" className="mt-20">
            <h3
              className="font-display text-2xl font-medium italic text-ink mb-8 text-center"
            >
              {about.experience.heading}
            </h3>
            <div className="relative max-w-2xl mx-auto">
              <div
                className="absolute left-0 top-0 bottom-0 w-px"
                style={{ background: 'var(--rim)', left: '50%' }}
              />
              {about.experience.items.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex items-center gap-6 mb-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="font-body text-sm font-medium text-ink">{item.company}</div>
                    <div className="ui-text text-xs tracking-wide" style={{ color: 'var(--ink-soft)' }}>
                      {item.role}
                    </div>
                  </div>
                  <div
                    className="flex-shrink-0 w-3 h-3 rounded-full border-2 relative z-10"
                    style={{
                      borderColor: 'var(--accent)',
                      background: 'var(--surface-alt)',
                    }}
                  />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
