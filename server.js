import express from 'express'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, 'data')
const PROGRESS_FILE = join(DATA_DIR, 'progress.json')
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json({ limit: '1mb' }))
app.use(express.static(join(__dirname, 'dist')))

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })

app.get('/api/progress', (req, res) => {
  if (!existsSync(PROGRESS_FILE)) return res.json({})
  try {
    res.json(JSON.parse(readFileSync(PROGRESS_FILE, 'utf8')))
  } catch {
    res.json({})
  }
})

app.post('/api/progress', (req, res) => {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
    writeFileSync(PROGRESS_FILE, JSON.stringify(req.body))
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// SPA fallback — all unknown routes serve index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
