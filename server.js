const express = require('express')
const app = express()
const sign = require('jwt-encode')
var cors = require('cors')
app.use(cors())
const secret = process.env.ENCRYPTION_KEY || 'marketplace-default'

app.use(express.json({ limit: '64mb' }))
app.use(express.urlencoded({ limit: '64mb', extended: true }))

app.get('/', (req, res) => {
  res.json({ send: 'Welcome to my app' })
})

app.get('/hello', (req, res) => {
  res.status(200).json({ data: 'Hello world' })
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  console.log(req.body)
  if (password !== 'Thinhpq@11')
    res.status(200).json({ data: null, message: 'Sai mat khau' })

  const data = {
    email: email,
    name: 'Thinhpq',
    iat: 1516239022
  }
  const jwt = sign(data, secret)

  res.status(200).json({ data: { user: data, token: jwt }, message: null })
})

app.listen(4000, () => {
  console.log('Server started on port 4000')
})
