// server.js
const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
//const router = jsonServer.router(path.join(__dirname, 'data.json'));
const router = jsonServer.router('data.json');

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

// server.post('/todos/create', function (req, res, next) {
//   const nameOfTask = req.body.name
//   const idOfTask = +(new Date())
//   req.body = {"id": idOfTask, "completed": false, "name": nameOfTask}
//   console.log(req)
//   setTimeout(function () {
//     next()
//   }, 800)
// });
//
// server.put('/todos/update', function (req, res, next) {
// //  req.url = '/todos/'+req.body.id
//   const fieldsToUpdate = {}
//   if (req.body.completed !== undefined) {
//     fieldsToUpdate.completed = req.body.completed
//   }
//   if (req.body.name) {
//     fieldsToUpdate.name = req.body.name
//   }
//   const db = router.db;
//   const t = db.get('todos').updateById(req.body.id, fieldsToUpdate).write()
//   console.log(t);
//   setTimeout(function () {
//     res.json({"id": req.body.id})
//   }, 500)
// });
//
// server.delete('/todos/delete', function (req, res, next) {
//   req.url = '/todos/' + req.body.id
//   setTimeout(function () {
//     next()
//   }, 400)
// })
//
// server.delete('/todos/deleteCompleted', function (req, res, next) {
//   const db = router.db
//   const t = db.get('todos').remove({completed: true}).write()
//   const r = db.get('todos').value()
//
//   setTimeout(function () {
//     res.json(r)
//   }, 600)
// })

server.post('/todos/delete-many', function (req, res, next) {
  const ids = req.body.ids;

  const db = router.db;
  for (let id of ids) {
    db.get('todos').remove({id: id}).write();
  }

  const r = db.get('todos').value();

  setTimeout(function () {
    res.json(r)
  }, 600)
});

// server.use(jsonServer.rewriter({
//   '/todos/all': '/todos',
//   '/todos/create': '/todos'
// }))

server.use(router)
server.listen(3000, function () {
  console.log('JSON Server is running')
});
