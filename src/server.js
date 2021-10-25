import express from 'express'
import next from 'next'

const server = express()
const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server started at port ${PORT}`)
  })
} else {
  const app = next({ dev: false })
  const handle = app.getRequestHandler()

  app.prepare().then(() => {
     createServer((req, res) => {
       const parsedUrl = parse(req.url, true)
       const { pathname, query } = parsedUrl
       app.render(req, res, '/misc/landing', query)
     }).listen(PORT, (err) => {
        if (err) throw err
        console.log(`Server started at port ${PORT}`)
     })
  })  
}
