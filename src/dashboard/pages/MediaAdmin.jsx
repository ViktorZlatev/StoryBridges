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
      + Add media item
    </button>
  )
}

export default function MediaAdmin() {
  const { draft, lang, updateSection } = useDraft()
  const data = draft[lang].media
  const set = (key, val) => updateSection('media', { ...data, [key]: val })
  const setItem = (i, field, val) => {
    const items = [...data.items]
    items[i] = { ...items[i], [field]: val }
    set('items', items)
  }
  const removeItem = i => set('items', data.items.filter((_, idx) => idx !== i))
  const addItem = () => set('items', [...data.items, { title: '', source: '', date: '', url: '#' }])

  return (
    <SectionShell title="Media">
      <Field label="Section label" value={data.label} onChange={v => set('label', v)} />
      <Field label="Heading" value={data.heading} onChange={v => set('heading', v)} />
      <Field label="Intro" value={data.intro} onChange={v => set('intro', v)} multiline rows={3} />

      <div style={{ height: '1px', background: '#D9CCAD', margin: '1.5rem 0' }} />

      {data.items.map((item, i) => (
        <ArrayCard key={i} index={i} onDelete={() => removeItem(i)}>
          <Field label="Title" value={item.title} onChange={v => setItem(i, 'title', v)} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <Field label="Source" value={item.source} onChange={v => setItem(i, 'source', v)} />
            <Field label="Date" value={item.date} onChange={v => setItem(i, 'date', v)} />
            <Field label="URL" value={item.url} onChange={v => setItem(i, 'url', v)} />
          </div>
        </ArrayCard>
      ))}
      <AddBtn onClick={addItem} />
    </SectionShell>
  )
}
