import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.static('dist'))

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

const PORT = process.env.PORT || 9876
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})