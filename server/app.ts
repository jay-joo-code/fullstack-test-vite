import express from 'express'
import path from 'path'
import cors from 'cors'
import router from './router'
import compression from 'compression'

const app = express()

// middleware
app.use(cors())
app.use(compression())
app.use(express.json({ limit: '500kb' }))
app.use(express.urlencoded({ extended: false }))

app.use('/api', router)
app.get('/api/health-check', (_, response) => response.status(200).send('OK'))

// serve static files from client
const isDev = path.dirname(__dirname) === 'server'
const clientBuild = `${isDev ? '' : '../'}../client/dist`
app.use(express.static(path.join(__dirname, clientBuild)))

// catch all handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, clientBuild, 'index.html'))
})

const port = process.env.PORT || 4001
app.listen(port, () => console.log('Listening at port', port))
