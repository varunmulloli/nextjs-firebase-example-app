const express = require('express')
const next = require('next')

var cookieParser = require('cookie-parser')
var csrf = require('csurf')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000;
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  var csrfProtection = csrf({ cookie: true })

  server.use(cookieParser())

  server.head('/api/csrf', csrfProtection, function (req, res) {
    res.set('x_csrf_token', req.csrfToken());
    res.send();
  })

  server.post('/api/login', csrfProtection, function(req, res) {
    handle(req,res)
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})