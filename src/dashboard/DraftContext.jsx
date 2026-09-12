import { createContext, useContext } from 'react'

export const DraftCtx = createContext(null)
export const useDraft = () => useContext(DraftCtx)
