import { useState } from 'react'
import Field from '../components/Field'
import ArrayCard from '../components/ArrayCard'
import SectionShell from '../components/SectionShell'

function AddBtn({ label = '+ Add item', onClick }) {
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
      {label}
    </button>
  )
}

function StringArrayEditor({ label, items, onChange }) {
  const set = (i, v) => { const a = [...items]; a[i] = v; onChange(a) }
  const remove = i => onChange(items.filter((_, idx) => idx !== i))
  const add = () => onChange([...items, ''])
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A0896C', marginBottom: '8px' }}>
        {label}
      </div>
      {items.map((item, i) => (
        <ArrayCard key={i} index={i} onDelete={() => remove(i)}>
          <Field value={item} onChange={v => set(i, v)} />
        </ArrayCard>
      ))}
      <AddBtn label="+ Add" onClick={add} />
    </div>
  )
}

export default function TrainingAdmin({ data, onChange }) {
  const [tab, setTab] = useState(0)
  const set = (key, val) => onChange({ ...data, [key]: val })

  const setOpenItem = (i, field, val) => {
    const items = [...data.open.items]
    items[i] = { ...items[i], [field]: val }
    set('open', { ...data.open, items })
  }
  const removeOpenItem = i => set('open', { ...data.open, items: data.open.items.filter((_, idx) => idx !== i) })
  const addOpenItem = () => set('open', { ...data.open, items: [...data.open.items, { id: '', title: '', tagline: '', desc: '', questions: [], benefits: [], cta: '' }] })

  const setCorpItem = (i, field, val) => {
    const items = [...data.corporate.items]
    items[i] = { ...items[i], [field]: val }
    set('corporate', { ...data.corporate, items })
  }
  const removeCorpItem = i => set('corporate', { ...data.corporate, items: data.corporate.items.filter((_, idx) => idx !== i) })
  const addCorpItem = () => set('corporate', { ...data.corporate, items: [...data.corporate.items, { id: '', title: '', desc: '' }] })

  const tabStyle = active => ({
    fontFamily: 'Raleway, sans-serif', fontSize: '0.68rem', fontWeight: 600,
    letterSpacing: '0.12em', textTransform: 'uppercase', padding: '7px 14px',
    borderRadius: '6px', cursor: 'pointer', border: 'none',
    background: active ? '#4D8FAA' : 'transparent',
    color: active ? '#fff' : '#A0896C',
    transition: 'all 0.15s',
  })

  return (
    <SectionShell title="Training">
      <Field label="Section label" value={data.label} onChange={v => set('label', v)} />
      <Field label="Heading" value={data.heading} onChange={v => set('heading', v)} />
      <Field label="Intro" value={data.intro} onChange={v => set('intro', v)} multiline rows={3} />

      <div style={{ display: 'flex', gap: '6px', margin: '1.5rem 0' }}>
        <button onClick={() => setTab(0)} style={tabStyle(tab === 0)}>Open Trainings</button>
        <button onClick={() => setTab(1)} style={tabStyle(tab === 1)}>Corporate Trainings</button>
      </div>

      {tab === 0 && (
        <>
          <Field label="Open trainings heading" value={data.open.heading} onChange={v => set('open', { ...data.open, heading: v })} />
          {data.open.items.map((item, i) => (
            <ArrayCard key={i} index={i} onDelete={() => removeOpenItem(i)}>
              <Field label="Title" value={item.title} onChange={v => setOpenItem(i, 'title', v)} />
              <Field label="Tagline" value={item.tagline} onChange={v => setOpenItem(i, 'tagline', v)} />
              <Field label="Description" value={item.desc} onChange={v => setOpenItem(i, 'desc', v)} multiline rows={3} />
              <Field label="CTA button" value={item.cta} onChange={v => setOpenItem(i, 'cta', v)} />
              <Field label="URL" value={item.url ?? ''} onChange={v => setOpenItem(i, 'url', v)} />
              <StringArrayEditor
                label="Questions"
                items={item.questions ?? []}
                onChange={v => setOpenItem(i, 'questions', v)}
              />
              <StringArrayEditor
                label="Benefits"
                items={item.benefits ?? []}
                onChange={v => setOpenItem(i, 'benefits', v)}
              />
            </ArrayCard>
          ))}
          <AddBtn label="+ Add open training" onClick={addOpenItem} />
        </>
      )}

      {tab === 1 && (
        <>
          <Field label="Corporate trainings heading" value={data.corporate.heading} onChange={v => set('corporate', { ...data.corporate, heading: v })} />
          {data.corporate.items.map((item, i) => (
            <ArrayCard key={i} index={i} onDelete={() => removeCorpItem(i)}>
              <Field label="Title" value={item.title} onChange={v => setCorpItem(i, 'title', v)} />
              <Field label="Description" value={item.desc} onChange={v => setCorpItem(i, 'desc', v)} multiline rows={3} />
            </ArrayCard>
          ))}
          <AddBtn label="+ Add corporate training" onClick={addCorpItem} />
        </>
      )}
    </SectionShell>
  )
}
