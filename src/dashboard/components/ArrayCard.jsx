import { useState } from 'react'

export default function ArrayCard({ index, onDelete, children }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{
      position: 'relative',
      background: '#FDFAF5',
      border: '1px solid #D9CCAD',
      borderRadius: '10px',
      padding: '1.4rem 1.25rem 1.1rem',
      marginBottom: '0.875rem',
    }}>
      {/* Index badge */}
      <div style={{
        position: 'absolute',
        top: '-9px',
        left: '16px',
        background: '#4D8FAA',
        color: '#fff',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '0.58rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        padding: '2px 9px',
        borderRadius: '20px',
        textTransform: 'uppercase',
      }}>
        {index + 1}
      </div>

      {/* × delete button */}
      <button
        onClick={onDelete}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title="Remove item"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '26px',
          height: '26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: hovered ? '#FBF0EE' : 'transparent',
          border: `1px solid ${hovered ? '#C0433A' : '#D9CCAD'}`,
          borderRadius: '5px',
          color: hovered ? '#C0433A' : '#A0896C',
          cursor: 'pointer',
          fontSize: '16px',
          lineHeight: 1,
          transition: 'all 0.15s',
          padding: 0,
        }}
      >
        ×
      </button>

      {children}
    </div>
  )
}
