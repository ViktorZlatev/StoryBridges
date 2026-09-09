import { createContext, useContext, useState, useEffect } from 'react'
import { content as staticContent } from '../data/content'

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(staticContent)

  useEffect(() => {
    fetch('/api/content', { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.bg && data?.en) setContent(data) })
      .catch(() => {})
  }, [])

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)
