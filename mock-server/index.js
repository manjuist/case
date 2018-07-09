const jsonServer = require('json-server')
const db =  require('./db')

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()
//const routes = require('./routes')

//server.use(jsonServer.rewriter(routes))
server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(router)
server.listen(3333,()=>{
    console.log('json server')
})
