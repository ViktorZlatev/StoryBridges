import { useDraft } from '../DraftContext'
import Field from '../components/Field'
import ArrayCard from '../components/ArrayCard'
import SectionShell from '../components/SectionShell'

function AddBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        background: 'transparent', border: '1px dashed #D9CCAD', borderRadius: '7px',
        color: '#A0896C', fontFamily: 'Raleway, sans-serif',
        fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em',
        textTransform: 'uppercase', padding: '9px 16px', cursor: 'pointer',
        transition: 'all 0.15s', width: '100%', justifyContent: 'center',
        marginTop: '0.25rem',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#4D8FAA'; e.currentTarget.style.color = '#4D8FAA' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#D9CCAD'; e.currentTarget.style.color = '#A0896C' }}
    >
      + Add item
    </button>
  )
}

export default function HeroAdmin() {
  const { draft, lang, updateSection } = useDraft()
  const data = draft[lang].hero
  const set = (key, val) => updateSection('hero', { ...data, [key]: val })
  const setWord = (i, v) => { const w = [...data.words]; w[i] = v; set('words', w) }
  const removeWord = i => set('words', data.words.filter((_, idx) => idx !== i))
  const addWord = () => set('words', [...data.words, ''])

  return (
    <SectionShell title="Hero">
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A0896C', marginBottom: '10px' }}>
          Animated words
        </div>
        {data.words.map((w, i) => (
          <ArrayCard key={i} index={i} onDelete={() => removeWord(i)}>
            <Field value={w} onChange={v => setWord(i, v)} />
          </ArrayCard>
        ))}
        <AddBtn onClick={addWord} />
      </div>

      <Field label="Subtitle" value={data.subtitle} onChange={v => set('subtitle', v)} multiline rows={3} />
      <Field label="CTA Button 1" value={data.cta1} onChange={v => set('cta1', v)} />
      <Field label="CTA Button 2" value={data.cta2} onChange={v => set('cta2', v)} />
    </SectionShell>
  )
}
