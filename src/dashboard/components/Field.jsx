const baseInput = {
  width: '100%',
  background: '#FDFAF5',
  border: '1px solid #D9CCAD',
  borderRadius: '7px',
  padding: '10px 14px',
  color: '#1A1208',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: '0.875rem',
  lineHeight: 1.6,
  outline: 'none',
  transition: 'border-color 0.18s, box-shadow 0.18s',
  boxSizing: 'border-box',
}

function focus(e)  { e.target.style.borderColor = '#4D8FAA'; e.target.style.boxShadow = '0 0 0 3px rgba(77,143,170,0.12)' }
function blur(e)   { e.target.style.borderColor = '#D9CCAD'; e.target.style.boxShadow = 'none' }

export default function Field({ label, value, onChange, multiline, rows = 4, mono }) {
  const style = { ...baseInput, ...(mono ? { fontFamily: '"Fira Code", monospace', fontSize: '0.82rem' } : {}) }
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      {label && (
        <label style={{
          display: 'block',
          fontFamily: 'Raleway, sans-serif',
          fontSize: '0.6rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#A0896C',
          marginBottom: '6px',
        }}>
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          rows={rows}
          style={{ ...style, resize: 'vertical' }}
          onFocus={focus}
          onBlur={blur}
        />
      ) : (
        <input
          type="text"
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          style={style}
          onFocus={focus}
          onBlur={blur}
        />
      )}
    </div>
  )
}
