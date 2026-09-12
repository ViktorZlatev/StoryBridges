import { useState, useEffect, useCallback } from 'react'
import { Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom'
import { useContent } from '../contexts/ContentContext'
import { DraftCtx } from './DraftContext'
import HeroAdmin from './pages/HeroAdmin'
import AboutAdmin from './pages/AboutAdmin'
import ConsultingAdmin from './pages/ConsultingAdmin'
import TrainingAdmin from './pages/TrainingAdmin'
import TestimonialsAdmin from './pages/TestimonialsAdmin'
import MediaAdmin from './pages/MediaAdmin'
import ContactAdmin from './pages/ContactAdmin'
import NavFooterAdmin from './pages/NavFooterAdmin'

const SECTIONS = [
  { path: 'hero',         label: 'Hero' },
  { path: 'about',        label: 'About' },
  { path: 'consulting',   label: 'Consulting' },
  { path: 'training',     label: 'Training' },
  { path: 'testimonials', label: 'Testimonials' },
  { path: 'media',        label: 'Media' },
  { path: 'contact',      label: 'Contact' },
  { path: 'nav-footer',   label: 'Navbar & Footer' },
]

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)) }

export default function DashboardLayout() {
  const { content, setContent } = useContent()
  const [draft, setDraft] = useState(null)
  const [lang, setLang] = useState('bg')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  // Initialise draft once from content (only when draft is null)
  useEffect(() => {
    if (!draft) setDraft(deepClone(content))
  }, [content, draft])

  const isDirty = draft && JSON.stringify(draft) !== JSON.stringify(content)

  // updateSection: called by admin pages via context
  const updateSection = useCallback((section, value) => {
    setDraft(prev => ({
      ...prev,
      [lang]: { ...prev[lang], [section]: value },
    }))
  }, [lang])

  async function save() {
    setSaving(true)
    try {
      const r = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(draft),
      })
      if (r.ok) {
        setContent(deepClone(draft))
        showToast('Saved successfully', 'ok')
      } else {
        const d = await r.json()
        showToast(d.error || 'Save failed', 'err')
      }
    } catch {
      showToast('Server unreachable', 'err')
    } finally {
      setSaving(false)
    }
  }

  function discard() {
    setDraft(deepClone(content))
    showToast('Changes discarded', 'ok')
  }

  function showToast(msg, type) {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    navigate('/dashboard/login', { replace: true })
  }

  if (!draft) return null

  const navLinkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 14px',
    borderRadius: '7px',
    textDecoration: 'none',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.72rem',
    fontWeight: isActive ? 600 : 500,
    letterSpacing: '0.08em',
    color: isActive ? '#1A1208' : '#6B5238',
    background: isActive ? '#E2D5B8' : 'transparent',
    transition: 'all 0.15s',
    border: 'none',
    cursor: 'pointer',
  })

  const langBtn = active => ({
    padding: '5px 12px',
    borderRadius: '5px',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.15s',
    background: active ? '#4D8FAA' : 'transparent',
    color: active ? '#fff' : '#6B5238',
  })

  return (
    <DraftCtx.Provider value={{ draft, setDraft, lang, updateSection }}>
      <div style={{ display: 'flex', height: '100vh', background: '#F6F1E8', color: '#1A1208', overflow: 'hidden' }}>

        {/* ── Sidebar ── */}
        <aside style={{
          width: '224px',
          flexShrink: 0,
          background: '#EDE3CE',
          borderRight: '1px solid #D9CCAD',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 12px',
        }}>
          <div style={{ padding: '24px 4px 20px' }}>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.35rem', fontWeight: 500, fontStyle: 'italic', color: '#1A1208', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              StoryBridges
            </div>
            <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4D8FAA', marginTop: '3px' }}>
              Admin Panel
            </div>
          </div>

          <div style={{ height: '1px', background: '#D9CCAD', marginBottom: '12px' }} />

          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {SECTIONS.map(s => (
              <NavLink key={s.path} to={`/dashboard/${s.path}`} style={navLinkStyle}>
                {({ isActive }) => (
                  <>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: isActive ? '#4D8FAA' : '#D9CCAD', flexShrink: 0 }} />
                    {s.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div style={{ height: '1px', background: '#D9CCAD', marginTop: '12px', marginBottom: '12px' }} />

          <div style={{ paddingBottom: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '7px', textDecoration: 'none', fontFamily: 'Raleway, sans-serif', fontSize: '0.7rem', letterSpacing: '0.06em', color: '#6B5238', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#1A1208'}
              onMouseLeave={e => e.currentTarget.style.color = '#6B5238'}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Preview site
            </a>
            <button
              onClick={logout}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '7px', background: 'transparent', border: 'none', fontFamily: 'Raleway, sans-serif', fontSize: '0.7rem', letterSpacing: '0.06em', color: '#6B5238', cursor: 'pointer', transition: 'color 0.15s', textAlign: 'left' }}
              onMouseEnter={e => e.currentTarget.style.color = '#C0433A'}
              onMouseLeave={e => e.currentTarget.style.color = '#6B5238'}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sign out
            </button>
          </div>
        </aside>

        {/* ── Main ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Topbar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 28px', height: '56px', flexShrink: 0,
            borderBottom: '1px solid #D9CCAD', background: '#EDE3CE',
          }}>
            <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A0896C' }}>
              Editing language
            </div>
            <div style={{ display: 'flex', gap: '4px', background: '#F6F1E8', padding: '4px', borderRadius: '8px', border: '1px solid #D9CCAD' }}>
              <button onClick={() => setLang('bg')} style={langBtn(lang === 'bg')}>BG</button>
              <button onClick={() => setLang('en')} style={langBtn(lang === 'en')}>EN</button>
            </div>
          </div>

          {/* Content area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '32px 36px 120px', background: '#F6F1E8' }}>
            <Routes>
              <Route index element={<Navigate to="/dashboard/hero" replace />} />
              <Route path="hero"         element={<HeroAdmin />} />
              <Route path="about"        element={<AboutAdmin />} />
              <Route path="consulting"   element={<ConsultingAdmin />} />
              <Route path="training"     element={<TrainingAdmin />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
              <Route path="media"        element={<MediaAdmin />} />
              <Route path="contact"      element={<ContactAdmin />} />
              <Route path="nav-footer"   element={<NavFooterAdmin />} />
            </Routes>
          </div>

          {/* ── Save bar ── */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '224px',
            right: 0,
            height: '64px',
            background: '#EDE3CE',
            borderTop: `1px solid ${isDirty ? '#B87A4A' : '#D9CCAD'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            padding: '0 36px',
            transition: 'border-color 0.3s',
          }}>
            {isDirty && (
              <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.62rem', letterSpacing: '0.1em', color: '#B87A4A', marginRight: 'auto' }}>
                ● Unsaved changes
              </span>
            )}
            <button
              onClick={discard}
              disabled={!isDirty || saving}
              style={{
                fontFamily: 'Raleway, sans-serif', fontSize: '0.7rem', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '9px 20px', borderRadius: '7px', cursor: isDirty ? 'pointer' : 'default',
                background: 'transparent', border: '1px solid #D9CCAD',
                color: isDirty ? '#6B5238' : '#A0896C', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (isDirty && !saving) e.currentTarget.style.borderColor = '#6B5238' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#D9CCAD' }}
            >
              Discard
            </button>
            <button
              onClick={save}
              disabled={saving}
              style={{
                fontFamily: 'Raleway, sans-serif', fontSize: '0.7rem', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '9px 24px', borderRadius: '7px', cursor: saving ? 'default' : 'pointer',
                background: saving ? '#A8C8D8' : '#4D8FAA', color: '#fff',
                border: 'none', transition: 'all 0.2s', minWidth: '120px',
              }}
              onMouseEnter={e => { if (!saving) e.currentTarget.style.background = '#3E7A94' }}
              onMouseLeave={e => { if (!saving) e.currentTarget.style.background = '#4D8FAA' }}
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div style={{
            position: 'fixed', bottom: '80px', right: '28px',
            padding: '12px 20px', borderRadius: '8px',
            fontFamily: 'Raleway, sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em',
            color: toast.type === 'ok' ? '#2A5A3A' : '#C0433A',
            background: toast.type === 'ok' ? '#EAF5EE' : '#FBF0EE',
            border: `1px solid ${toast.type === 'ok' ? '#A0C8B0' : '#D9A0A0'}`,
            boxShadow: '0 4px 20px rgba(26,18,8,0.1)',
            animation: 'fadeInUp 0.25s ease', zIndex: 100,
          }}>
            {toast.type === 'ok' ? '✓ ' : '✕ '}{toast.msg}
          </div>
        )}

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: #F6F1E8; }
          ::-webkit-scrollbar-thumb { background: #D9CCAD; border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: #A0896C; }
        `}</style>
      </div>
    </DraftCtx.Provider>
  )
}
