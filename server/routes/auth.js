import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body ?? {}
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' })
  }

  const usernameMatch = username === process.env.ADMIN_USERNAME
  // Always run bcrypt compare to avoid timing attacks that reveal valid usernames
  const storedHash = process.env.ADMIN_PASSWORD_HASH || '$2a$12$invalidhashplaceholderXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  const passwordMatch = await bcrypt.compare(password, storedHash)

  if (!usernameMatch || !passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { username, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )

  res.cookie('sb_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  })

  res.json({ ok: true })
})

router.post('/logout', (_req, res) => {
  res.clearCookie('sb_token')
  res.json({ ok: true })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ username: req.user.username, role: req.user.role })
})

export default router
