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
      + Add service
    </button>
  )
}

export default function ConsultingAdmin() {
  const { draft, lang, updateSection } = useDraft()
  const data = draft[lang].consulting
  const set = (key, val) => updateSection('consulting', { ...data, [key]: val })
  const setService = (i, field, val) => {
    const services = [...data.services]
    services[i] = { ...services[i], [field]: val }
    set('services', services)
  }
  const removeService = i => set('services', data.services.filter((_, idx) => idx !== i))
  const addService = () => set('services', [...data.services, { num: String(data.services.length + 1).padStart(2, '0'), title: '', desc: '', details: '' }])

  return (
    <SectionShell title="Consulting">
      <Field label="Section label" value={data.label} onChange={v => set('label', v)} />
      <Field label="Heading" value={data.heading} onChange={v => set('heading', v)} />
      <Field label="Intro" value={data.intro} onChange={v => set('intro', v)} multiline rows={3} />

      <div style={{ height: '1px', background: '#D9CCAD', margin: '1.5rem 0' }} />

      {data.services.map((svc, i) => (
        <ArrayCard key={i} index={i} onDelete={() => removeService(i)}>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '12px', marginBottom: '2px' }}>
            <Field label="No." value={svc.num} onChange={v => setService(i, 'num', v)} />
            <Field label="Title" value={svc.title} onChange={v => setService(i, 'title', v)} />
          </div>
          <Field label="Short description" value={svc.desc} onChange={v => setService(i, 'desc', v)} multiline rows={2} />
          <Field label="Extended details" value={svc.details} onChange={v => setService(i, 'details', v)} multiline rows={4} />
        </ArrayCard>
      ))}
      <AddBtn onClick={addService} />
    </SectionShell>
  )
}
