//@ts-nocheck
import path from 'path'
import jsonServer from 'json-server'
import routes from './routes/index.js'

const __dirname = path.resolve()
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

routes.forEach(([method, path, handler]) => {
  server[method](path, handler)
})

// default router
server.use(router)

server.listen(3003, () => {
  console.log('JSON Server is running')
})
