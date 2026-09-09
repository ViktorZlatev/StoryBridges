export default function SectionShell({ title, children }) {
  return (
    <div>
      <h2 style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: '1.9rem',
        fontWeight: 500,
        fontStyle: 'italic',
        color: '#1A1208',
        marginBottom: '0.25rem',
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h2>
      <div style={{ height: '1px', background: '#D9CCAD', marginBottom: '1.75rem' }} />
      {children}
    </div>
  )
}
