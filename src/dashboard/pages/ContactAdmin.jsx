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
      + Add option
    </button>
  )
}

export default function ContactAdmin() {
  const { draft, lang, updateSection } = useDraft()
  const data = draft[lang].contact
  const set = (key, val) => updateSection('contact', { ...data, [key]: val })
  const setInfo = (key, val) => set('info', { ...data.info, [key]: val })
  const setForm = (key, val) => set('form', { ...data.form, [key]: val })
  const setOpt = (i, v) => { const a = [...data.form.subjectOptions]; a[i] = v; setForm('subjectOptions', a) }
  const removeOpt = i => setForm('subjectOptions', data.form.subjectOptions.filter((_, idx) => idx !== i))
  const addOpt = () => setForm('subjectOptions', [...data.form.subjectOptions, ''])

  return (
    <SectionShell title="Contact">
      <Field label="Section label" value={data.label} onChange={v => set('label', v)} />
      <Field label="Heading" value={data.heading} onChange={v => set('heading', v)} />
      <Field label="Intro" value={data.intro} onChange={v => set('intro', v)} multiline rows={3} />

      <div style={{ height: '1px', background: '#D9CCAD', margin: '1.5rem 0' }} />
      <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4D8FAA', marginBottom: '12px' }}>
        Contact info
      </div>
      <Field label="Email" value={data.info.email} onChange={v => setInfo('email', v)} />
      <Field label="Phone" value={data.info.phone} onChange={v => setInfo('phone', v)} />
      <Field label="LinkedIn" value={data.info.linkedin} onChange={v => setInfo('linkedin', v)} />

      <div style={{ height: '1px', background: '#D9CCAD', margin: '1.5rem 0' }} />
      <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4D8FAA', marginBottom: '12px' }}>
        Form labels
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Field label="Name field" value={data.form.name} onChange={v => setForm('name', v)} />
        <Field label="Email field" value={data.form.email} onChange={v => setForm('email', v)} />
        <Field label="Subject field" value={data.form.subject} onChange={v => setForm('subject', v)} />
        <Field label="Message field" value={data.form.message} onChange={v => setForm('message', v)} />
        <Field label="Submit button" value={data.form.submit} onChange={v => setForm('submit', v)} />
      </div>

      <div style={{ marginTop: '0.5rem' }}>
        <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A0896C', marginBottom: '10px' }}>
          Subject options
        </div>
        {data.form.subjectOptions.map((opt, i) => (
          <ArrayCard key={i} index={i} onDelete={() => removeOpt(i)}>
            <Field value={opt} onChange={v => setOpt(i, v)} />
          </ArrayCard>
        ))}
        <AddBtn onClick={addOpt} />
      </div>
    </SectionShell>
  )
}
