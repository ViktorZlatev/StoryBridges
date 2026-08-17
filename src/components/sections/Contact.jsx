import { useState, useRef, useEffect } from 'react'
import { useApp } from '../../contexts/AppContext'
import { content } from '../../data/content'
import { useScrollReveal } from '../../hooks/useScrollReveal'

function FloatingInput({ label, name, type = 'text', value, onChange }) {
  const [focused, setFocused] = useState(false)
  const raised = focused || value.length > 0

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        placeholder=""
        className="w-full px-4 pt-6 pb-2.5 font-body text-sm outline-none"
        style={{
          background: 'var(--surface-base)',
          borderRadius: '14px',
          border: '2px solid',
          borderColor: focused ? 'var(--accent)' : 'var(--rim)',
          boxShadow: focused ? '0 0 0 4px var(--accent-muted)' : '0 0 0 0px transparent',
          color: 'var(--ink)',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        }}
      />
      <label
        className="absolute left-4 pointer-events-none font-ui"
        style={{
          top: raised ? '9px' : '50%',
          transform: raised ? 'translateY(0) scale(0.72)' : 'translateY(-50%)',
          transformOrigin: 'left top',
          letterSpacing: raised ? '0.1em' : '0',
          textTransform: raised ? 'uppercase' : 'none',
          color: focused ? 'var(--accent)' : 'var(--ink-soft)',
          fontSize: '0.82rem',
          transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {label}
      </label>
    </div>
  )
}

function FloatingTextarea({ label, name, value, onChange }) {
  const [focused, setFocused] = useState(false)
  const raised = focused || value.length > 0

  return (
    <div className="relative">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        rows={3}
        placeholder=""
        className="w-full px-4 pt-7 pb-3 font-body text-sm outline-none resize-none"
        style={{
          background: 'var(--surface-base)',
          borderRadius: '14px',
          border: '2px solid',
          borderColor: focused ? 'var(--accent)' : 'var(--rim)',
          boxShadow: focused ? '0 0 0 4px var(--accent-muted)' : '0 0 0 0px transparent',
          color: 'var(--ink)',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        }}
      />
      <label
        className="absolute left-4 pointer-events-none font-ui"
        style={{
          top: raised ? '10px' : '18px',
          transform: raised ? 'scale(0.72)' : 'scale(1)',
          transformOrigin: 'left top',
          letterSpacing: raised ? '0.1em' : '0',
          textTransform: raised ? 'uppercase' : 'none',
          color: focused ? 'var(--accent)' : 'var(--ink-soft)',
          fontSize: '0.82rem',
          transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {label}
      </label>
    </div>
  )
}

function FloatingSelect({ label, name, value, onChange, options }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const raised = value.length > 0 || open

  useEffect(() => {
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } })
    setOpen(false)
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full text-left px-4 pt-6 pb-2.5 font-body text-sm outline-none"
        style={{
          background: 'var(--surface-base)',
          borderRadius: '14px',
          border: '2px solid',
          borderColor: open ? 'var(--accent)' : 'var(--rim)',
          boxShadow: open ? '0 0 0 4px var(--accent-muted)' : '0 0 0 0px transparent',
          color: value ? 'var(--ink)' : 'transparent',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        {value || ' '}
      </button>

      {/* Chevron */}
      <div
        className="absolute right-4 top-1/2 pointer-events-none"
        style={{
          color: open ? 'var(--accent)' : 'var(--ink-soft)',
          transform: `translateY(-50%) rotate(${open ? '180deg' : '0deg'})`,
          transition: 'transform 0.2s ease, color 0.2s ease',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      {/* Floating label */}
      <label
        className="absolute left-4 pointer-events-none font-ui"
        style={{
          top: raised ? '9px' : '50%',
          transform: raised ? 'translateY(0) scale(0.72)' : 'translateY(-50%)',
          transformOrigin: 'left top',
          letterSpacing: raised ? '0.1em' : '0',
          textTransform: raised ? 'uppercase' : 'none',
          color: open ? 'var(--accent)' : 'var(--ink-soft)',
          fontSize: '0.82rem',
          transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {label}
      </label>

      {/* Options list */}
      <div
        style={{
          position: 'absolute',
          left: 0, right: 0,
          top: 'calc(100% + 8px)',
          zIndex: 50,
          borderRadius: '14px',
          overflow: 'hidden',
          background: 'var(--surface-card)',
          border: '2px solid var(--accent)',
          boxShadow: '0 12px 36px -8px rgba(0,0,0,0.18)',
          maxHeight: open ? '260px' : '0',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease',
          pointerEvents: open ? 'auto' : 'none',
          overflowY: 'auto',
        }}
      >
        {options.map((option, i) => (
          <button
            key={option}
            type="button"
            onClick={() => handleSelect(option)}
            className="w-full text-left px-5 py-3 font-body text-sm transition-colors duration-150"
            style={{
              color: value === option ? 'var(--accent)' : 'var(--ink)',
              background: value === option ? 'var(--accent-muted)' : 'transparent',
              borderTop: i > 0 ? '1px solid var(--rim)' : 'none',
              fontWeight: value === option ? 500 : 400,
            }}
            onMouseEnter={e => { if (value !== option) e.currentTarget.style.background = 'var(--surface-alt)' }}
            onMouseLeave={e => { if (value !== option) e.currentTarget.style.background = 'transparent' }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function ContactItem({ icon, label, value, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
      <div className="flex-shrink-0 mt-0.5 transition-colors group-hover:text-accent" style={{ color: 'var(--ink-soft)' }}>
        {icon}
      </div>
      <div>
        <div className="font-ui text-xs tracking-widest uppercase mb-0.5" style={{ color: 'var(--ink-soft)' }}>
          {label}
        </div>
        <div className="font-body text-sm group-hover:text-accent transition-colors" style={{ color: 'var(--ink-mid)' }}>
          {value}
        </div>
      </div>
    </a>
  )
}

export default function Contact() {
  const { lang } = useApp()
  const t = content[lang].contact
  const ref = useScrollReveal()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSent(true) }, 800)
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'var(--surface-alt)' }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'var(--accent-muted)', opacity: 0.18,
          top: '-200px', right: '-200px', filter: 'blur(80px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: info */}
          <div>
            <p data-reveal className="section-label mb-5">{t.label}</p>
            <h2 data-reveal data-delay="2" className="display-lg font-display text-ink mb-6">
              {t.heading}
            </h2>
            <p data-reveal data-delay="3" className="font-body text-base leading-relaxed mb-12" style={{ color: 'var(--ink-mid)' }}>
              {t.intro}
            </p>

            <div data-reveal data-delay="4" className="flex flex-col gap-6">
              <ContactItem
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                label="Email" value={t.info.email} href={`mailto:${t.info.email}`}
              />
              <ContactItem
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.08 6.08l1.14-1.14a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
                label={lang === 'bg' ? 'Телефон' : 'Phone'} value={t.info.phone} href={`tel:${t.info.phone.replace(/\s/g, '')}`}
              />
              <ContactItem
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>}
                label="LinkedIn" value={t.info.linkedin} href={`https://${t.info.linkedin}`}
              />
            </div>
          </div>

          {/* Right: form */}
          <div data-reveal data-delay="2" className="mt-10">
            {sent ? (
              <div
                className="flex flex-col items-center justify-center text-center p-14 rounded-3xl"
                style={{ background: 'var(--surface-card)', border: '2px solid var(--rim)' }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-medium italic text-ink mb-3">
                  {lang === 'bg' ? 'Съобщението е изпратено!' : 'Message sent!'}
                </h3>
                <p className="font-body text-sm" style={{ color: 'var(--ink-mid)' }}>
                  {lang === 'bg' ? 'Ще се свържа с теб скоро.' : "I'll get back to you soon."}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 lg:p-10 rounded-3xl flex flex-col gap-4"
                style={{
                  background: 'var(--surface-card)',
                  border: '2px solid var(--rim)',
                  boxShadow: '0 8px 40px -12px rgba(0,0,0,0.12)',
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <FloatingInput label={t.form.name}  name="name"  type="text"  value={form.name}  onChange={handleChange} />
                  <FloatingInput label={t.form.email} name="email" type="email" value={form.email} onChange={handleChange} />
                </div>
                <FloatingSelect label={t.form.subject} name="subject" value={form.subject} onChange={handleChange} options={t.form.subjectOptions} />
                <FloatingTextarea label={t.form.message} name="message" value={form.message} onChange={handleChange} />

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl font-ui text-sm font-semibold tracking-widest uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70"
                  style={{ background: 'var(--accent)', letterSpacing: '0.14em' }}
                >
                  {submitting ? (lang === 'bg' ? 'Изпращане...' : 'Sending...') : t.form.submit}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>


    </section>
  )
}
