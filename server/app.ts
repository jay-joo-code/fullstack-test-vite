import express from 'express'
import path from 'path'
import cors from 'cors'
import router from './router'

const app = express()

// middleware
app.use(cors())
app.use(express.json({ limit: '500kb' }))
app.use(express.urlencoded({ extended: false }))

app.use('/api', router)
app.get('/api/health-check', (_, response) => response.status(200).send('OK'))

// serve static files from frontend
const isDev = path.dirname(__dirname) === 'server'
const frontendBuild = `${isDev ? '' : '../'}../frontend/dist`
app.use(express.static(path.join(__dirname, frontendBuild)))

// catch all handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, frontendBuild, 'index.html'))
})

const port = process.env.PORT || 4001
app.listen(port, () => console.log('Listening at port', port))
