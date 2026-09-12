import { useDraft } from '../DraftContext'
import Field from '../components/Field'
import ArrayCard from '../components/ArrayCard'
import SectionShell from '../components/SectionShell'

function AddBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center',
      background: 'transparent', border: '1px dashed #D9CCAD', borderRadius: '7px',
      color: '#A0896C', fontFamily: 'Raleway, sans-serif', fontSize: '0.68rem',
      fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
      padding: '9px 16px', cursor: 'pointer', transition: 'all 0.15s', width: '100%', marginTop: '4px',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#4D8FAA'; e.currentTarget.style.color = '#4D8FAA' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#D9CCAD'; e.currentTarget.style.color = '#A0896C' }}
    >
      + Add link
    </button>
  )
}

export default function NavFooterAdmin() {
  const { draft, lang, updateSection } = useDraft()
  const navData = draft[lang].nav
  const footerData = draft[lang].footer
  const setNav = (key, val) => updateSection('nav', { ...navData, [key]: val })
  const setFooter = (key, val) => updateSection('footer', { ...footerData, [key]: val })
  const setLink = (i, field, val) => {
    const links = [...footerData.links]
    links[i] = { ...links[i], [field]: val }
    setFooter('links', links)
  }
  const removeLink = i => setFooter('links', footerData.links.filter((_, idx) => idx !== i))
  const addLink = () => setFooter('links', [...footerData.links, { label: '', href: '#' }])

  return (
    <SectionShell title="Navbar & Footer">
      <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4D8FAA', marginBottom: '12px' }}>
        Navigation labels
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '1.5rem' }}>
        {Object.keys(navData).map(key => (
          <Field key={key} label={key} value={navData[key]} onChange={v => setNav(key, v)} />
        ))}
      </div>

      <div style={{ height: '1px', background: '#D9CCAD', marginBottom: '1.5rem' }} />
      <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4D8FAA', marginBottom: '12px' }}>
        Footer
      </div>
      <Field label="Copyright text" value={footerData.copy} onChange={v => setFooter('copy', v)} />
      <Field label="Tagline" value={footerData.made} onChange={v => setFooter('made', v)} />

      <div style={{ marginTop: '0.5rem' }}>
        <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A0896C', marginBottom: '10px' }}>
          Footer links
        </div>
        {footerData.links.map((link, i) => (
          <ArrayCard key={i} index={i} onDelete={() => removeLink(i)}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="Label" value={link.label} onChange={v => setLink(i, 'label', v)} />
              <Field label="href" value={link.href} onChange={v => setLink(i, 'href', v)} />
            </div>
          </ArrayCard>
        ))}
        <AddBtn onClick={addLink} />
      </div>
    </SectionShell>
  )
}
