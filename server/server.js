// server.js
var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('data.json')
var middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.post('/todos/create', function (req, res, next) {
  var nameOfTask = req.body.name
  var idOfTask = +(new Date())
  req.body = {"id": idOfTask, "completed": false, "name": nameOfTask}
  console.log(req)
  setTimeout(function(){next()}, 800)
})

server.put('/todos/update', function (req, res, next) {
//  req.url = '/todos/'+req.body.id
var fieldsToUpdate = {}
if(req.body.completed !== undefined) {
  fieldsToUpdate.completed = req.body.completed
}
if(req.body.name) {
  fieldsToUpdate.name = req.body.name
}
var db = router.db
var t = db.get('todos').updateById(req.body.id, fieldsToUpdate).write()
console.log(t)
setTimeout(function() {
  res.json({"id":req.body.id})
}, 500)
})

server.delete('/todos/delete', function (req, res, next) {
  req.url = '/todos/'+req.body.id
  setTimeout(function(){next()}, 400)
})

server.delete('/todos/deleteCompleted', function (req, res, next) {
  var db = router.db
  var t = db.get('todos').remove({completed:true}).write()
  var r = db.get('todos').value()

  setTimeout(function(){res.json(r)}, 600)
})

server.use(jsonServer.rewriter({
  '/todos/all': '/todos',
  '/todos/create': '/todos'
}))
server.use(router)
server.listen(3000, function () {
  console.log('JSON Server is running')
})
