import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import contentRouter from './routes/content.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json({ limit: '4mb' }))
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))

app.use('/api/auth', authRouter)
app.use('/api/content', contentRouter)

app.listen(PORT, () => {
  console.log(`StoryBridges API  →  http://localhost:${PORT}`)
})
