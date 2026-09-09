import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(r => { if (r.ok) navigate('/dashboard', { replace: true }) })
      .catch(() => {})
  }, [navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const r = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      })
      const data = await r.json()
      if (r.ok) {
        navigate('/dashboard', { replace: true })
      } else {
        setError(data.error || 'Invalid credentials')
      }
    } catch {
      setError('Server unreachable. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: '#FDFAF5',
    border: '1px solid #D9CCAD',
    borderRadius: '8px',
    padding: '13px 16px',
    color: '#1A1208',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F6F1E8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Raleway, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(168,200,216,0.35) 0%, transparent 60%), radial-gradient(ellipse 50% 80% at 10% 80%, rgba(237,227,206,0.8) 0%, transparent 55%)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 'clamp(14rem, 28vw, 36rem)',
        fontWeight: 600,
        fontStyle: 'italic',
        color: '#1A1208',
        opacity: 0.04,
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        letterSpacing: '-0.04em',
      }}>
        S
      </div>

      {/* Card */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '420px',
        margin: '0 24px',
        background: '#FDFAF5',
        border: '1px solid #D9CCAD',
        borderRadius: '16px',
        padding: '48px 40px',
        boxShadow: '0 8px 40px rgba(26,18,8,0.08)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '2rem',
            fontWeight: 500,
            fontStyle: 'italic',
            color: '#1A1208',
            letterSpacing: '-0.01em',
            marginBottom: '4px',
          }}>
            StoryBridges
          </div>
          <div style={{
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#4D8FAA',
          }}>
            Admin Panel
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A0896C', marginBottom: '8px' }}>
              Username
            </label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = '#4D8FAA'; e.target.style.boxShadow = '0 0 0 3px rgba(77,143,170,0.12)' }}
              onBlur={e => { e.target.style.borderColor = '#D9CCAD'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A0896C', marginBottom: '8px' }}>
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = '#4D8FAA'; e.target.style.boxShadow = '0 0 0 3px rgba(77,143,170,0.12)' }}
              onBlur={e => { e.target.style.borderColor = '#D9CCAD'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {error && (
            <div style={{
              background: '#FBF0EE',
              border: '1px solid #D9A0A0',
              borderRadius: '6px',
              padding: '10px 14px',
              color: '#C0433A',
              fontSize: '0.82rem',
              marginBottom: '20px',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              background: loading ? '#A8C8D8' : '#4D8FAA',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'Raleway, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: loading ? 'default' : 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#3E7A94' }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#4D8FAA' }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <a
            href="/"
            style={{ fontSize: '0.72rem', color: '#A0896C', letterSpacing: '0.08em', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#6B5238'}
            onMouseLeave={e => e.currentTarget.style.color = '#A0896C'}
          >
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  )
}
