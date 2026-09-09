import { Router } from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = join(__dirname, '../data/content.json')

function readContent() {
  if (!existsSync(DATA_PATH)) return null
  return JSON.parse(readFileSync(DATA_PATH, 'utf8'))
}

router.get('/', (_req, res) => {
  const c = readContent()
  if (!c) return res.status(404).json({ error: 'Content not initialised' })
  res.json(c)
})

router.put('/', requireAuth, (req, res) => {
  const { bg, en } = req.body ?? {}
  if (!bg || !en) return res.status(400).json({ error: 'Both bg and en keys required' })
  writeFileSync(DATA_PATH, JSON.stringify({ bg, en }, null, 2), 'utf8')
  res.json({ ok: true })
})

export default router
