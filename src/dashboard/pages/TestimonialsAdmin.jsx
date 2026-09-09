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
      + Add testimonial
    </button>
  )
}

export default function TestimonialsAdmin({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val })
  const setItem = (i, field, val) => {
    const items = [...data.items]
    items[i] = { ...items[i], [field]: val }
    set('items', items)
  }
  const removeItem = i => set('items', data.items.filter((_, idx) => idx !== i))
  const addItem = () => set('items', [...data.items, { text: '', name: '', role: '', company: '' }])

  return (
    <SectionShell title="Testimonials">
      <Field label="Section label" value={data.label} onChange={v => set('label', v)} />
      <Field label="Heading" value={data.heading} onChange={v => set('heading', v)} />

      <div style={{ height: '1px', background: '#D9CCAD', margin: '1.5rem 0' }} />

      {data.items.map((item, i) => (
        <ArrayCard key={i} index={i} onDelete={() => removeItem(i)}>
          <Field label="Quote text" value={item.text} onChange={v => setItem(i, 'text', v)} multiline rows={4} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <Field label="Name" value={item.name} onChange={v => setItem(i, 'name', v)} />
            <Field label="Role" value={item.role} onChange={v => setItem(i, 'role', v)} />
            <Field label="Company" value={item.company} onChange={v => setItem(i, 'company', v)} />
          </div>
        </ArrayCard>
      ))}
      <AddBtn onClick={addItem} />
    </SectionShell>
  )
}
