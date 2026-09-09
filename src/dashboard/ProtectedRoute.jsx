import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(r => setStatus(r.ok ? 'ok' : 'unauth'))
      .catch(() => setStatus('unauth'))
  }, [])

  if (status === 'loading') {
    return (
      <div style={{
        height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#F6F1E8', fontFamily: 'Raleway, sans-serif', color: '#A0896C', fontSize: '0.8rem',
        letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>
        Verifying…
      </div>
    )
  }

  if (status === 'unauth') return <Navigate to="/dashboard/login" replace />
  return children
}
