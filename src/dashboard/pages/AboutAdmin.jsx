import { useState } from 'react'
import Field from '../components/Field'
import ArrayCard from '../components/ArrayCard'
import SectionShell from '../components/SectionShell'

const TABS = ['Philosophy', 'Founder', 'Highlights', 'Story / Mission / Experience']

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
      + Add item
    </button>
  )
}

export default function AboutAdmin({ data, onChange, aneliaData, onAneliaChange, philosophyData, onPhilosophyChange, highlightsData, onHighlightsChange }) {
  const [tab, setTab] = useState(0)

  const tabStyle = active => ({
    fontFamily: 'Raleway, sans-serif', fontSize: '0.68rem', fontWeight: 600,
    letterSpacing: '0.12em', textTransform: 'uppercase', padding: '7px 14px',
    borderRadius: '6px', cursor: 'pointer', border: 'none',
    background: active ? '#4D8FAA' : 'transparent',
    color: active ? '#fff' : '#A0896C',
    transition: 'all 0.15s',
  })

  const setAbout = (key, sub, val) => {
    if (sub) onChange({ ...data, [key]: { ...data[key], [sub]: val } })
    else onChange({ ...data, [key]: val })
  }
  const setExpItem = (i, field, val) => {
    const items = [...data.experience.items]
    items[i] = { ...items[i], [field]: val }
    onChange({ ...data, experience: { ...data.experience, items } })
  }
  const removeExpItem = i => onChange({ ...data, experience: { ...data.experience, items: data.experience.items.filter((_, idx) => idx !== i) } })
  const addExpItem = () => onChange({ ...data, experience: { ...data.experience, items: [...data.experience.items, { company: '', role: '' }] } })

  const setAnelia = (key, val) => onAneliaChange({ ...aneliaData, [key]: val })
  const setStat = (i, field, val) => { const s = [...aneliaData.stats]; s[i] = { ...s[i], [field]: val }; setAnelia('stats', s) }
  const removeStat = i => setAnelia('stats', aneliaData.stats.filter((_, idx) => idx !== i))
  const addStat = () => setAnelia('stats', [...aneliaData.stats, { value: '', label: '' }])
  const setCompany = (i, val) => { const c = [...aneliaData.companies]; c[i] = val; setAnelia('companies', c) }
  const removeCompany = i => setAnelia('companies', aneliaData.companies.filter((_, idx) => idx !== i))
  const addCompany = () => setAnelia('companies', [...aneliaData.companies, ''])

  const setHighlight = (i, field, val) => { const items = [...highlightsData.items]; items[i] = { ...items[i], [field]: val }; onHighlightsChange({ ...highlightsData, items }) }
  const removeHighlight = i => onHighlightsChange({ ...highlightsData, items: highlightsData.items.filter((_, idx) => idx !== i) })
  const addHighlight = () => onHighlightsChange({ ...highlightsData, items: [...highlightsData.items, { id: '', icon: '', title: '', desc: '' }] })

  return (
    <SectionShell title="About">
      <div style={{ display: 'flex', gap: '6px', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={tabStyle(tab === i)}>{t}</button>
        ))}
      </div>

      {tab === 0 && (
        <>
          <Field label="Label" value={philosophyData.label} onChange={v => onPhilosophyChange({ ...philosophyData, label: v })} />
          <Field label="Heading" value={philosophyData.heading} onChange={v => onPhilosophyChange({ ...philosophyData, heading: v })} />
          <Field label="Text" value={philosophyData.text} onChange={v => onPhilosophyChange({ ...philosophyData, text: v })} multiline rows={5} />
        </>
      )}

      {tab === 1 && (
        <>
          <Field label="Section label" value={aneliaData.label} onChange={v => setAnelia('label', v)} />
          <Field label="Name" value={aneliaData.name} onChange={v => setAnelia('name', v)} />
          <Field label="Title" value={aneliaData.title} onChange={v => setAnelia('title', v)} />
          <Field label="Tagline" value={aneliaData.tagline} onChange={v => setAnelia('tagline', v)} />
          <Field label="Bio" value={aneliaData.bio} onChange={v => setAnelia('bio', v)} multiline rows={5} />

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A0896C', marginBottom: '10px' }}>
              Companies
            </div>
            {aneliaData.companies.map((c, i) => (
              <ArrayCard key={i} index={i} onDelete={() => removeCompany(i)}>
                <Field value={c} onChange={v => setCompany(i, v)} />
              </ArrayCard>
            ))}
            <AddBtn onClick={addCompany} />
          </div>

          <div>
            <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A0896C', marginBottom: '10px' }}>
              Stats
            </div>
            {aneliaData.stats.map((s, i) => (
              <ArrayCard key={i} index={i} onDelete={() => removeStat(i)}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                  <Field label="Value" value={s.value} onChange={v => setStat(i, 'value', v)} />
                  <Field label="Label" value={s.label} onChange={v => setStat(i, 'label', v)} />
                </div>
              </ArrayCard>
            ))}
            <AddBtn onClick={addStat} />
          </div>
        </>
      )}

      {tab === 2 && (
        <>
          <Field label="Heading" value={highlightsData.heading} onChange={v => onHighlightsChange({ ...highlightsData, heading: v })} />
          <div style={{ marginTop: '0.5rem' }}>
            {highlightsData.items.map((item, i) => (
              <ArrayCard key={i} index={i} onDelete={() => removeHighlight(i)}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <Field label="Title" value={item.title} onChange={v => setHighlight(i, 'title', v)} />
                  <Field label="Icon key" value={item.icon} onChange={v => setHighlight(i, 'icon', v)} />
                </div>
                <Field label="Description" value={item.desc} onChange={v => setHighlight(i, 'desc', v)} multiline rows={2} />
              </ArrayCard>
            ))}
            <AddBtn onClick={addHighlight} />
          </div>
        </>
      )}

      {tab === 3 && (
        <>
          <Field label="Section label" value={data.label} onChange={v => setAbout('label', null, v)} />
          <div style={{ background: '#EDE3CE', borderRadius: '8px', padding: '1.1rem', marginBottom: '1.1rem' }}>
            <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4D8FAA', marginBottom: '12px' }}>Story</div>
            <Field label="Heading" value={data.story.heading} onChange={v => setAbout('story', 'heading', v)} />
            <Field label="Text" value={data.story.text} onChange={v => setAbout('story', 'text', v)} multiline rows={4} />
          </div>
          <div style={{ background: '#EDE3CE', borderRadius: '8px', padding: '1.1rem', marginBottom: '1.1rem' }}>
            <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4D8FAA', marginBottom: '12px' }}>Mission</div>
            <Field label="Heading" value={data.mission.heading} onChange={v => setAbout('mission', 'heading', v)} />
            <Field label="Text" value={data.mission.text} onChange={v => setAbout('mission', 'text', v)} multiline rows={4} />
          </div>
          <div style={{ background: '#EDE3CE', borderRadius: '8px', padding: '1.1rem', marginBottom: '1.1rem' }}>
            <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4D8FAA', marginBottom: '12px' }}>Philosophy</div>
            <Field label="Heading" value={data.philosophy.heading} onChange={v => setAbout('philosophy', 'heading', v)} />
            <Field label="Text" value={data.philosophy.text} onChange={v => setAbout('philosophy', 'text', v)} multiline rows={4} />
          </div>
          <div style={{ background: '#EDE3CE', borderRadius: '8px', padding: '1.1rem' }}>
            <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4D8FAA', marginBottom: '12px' }}>Experience timeline</div>
            {data.experience.items.map((item, i) => (
              <ArrayCard key={i} index={i} onDelete={() => removeExpItem(i)}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <Field label="Company" value={item.company} onChange={v => setExpItem(i, 'company', v)} />
                  <Field label="Role" value={item.role} onChange={v => setExpItem(i, 'role', v)} />
                </div>
              </ArrayCard>
            ))}
            <AddBtn onClick={addExpItem} />
          </div>
        </>
      )}
    </SectionShell>
  )
}
