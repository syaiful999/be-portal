module.exports = function (app) {
  var todoList = require('./express/controller/HomeController')

  app.route('/')
    .get(todoList.index)

  app.route('/users')
    .get(todoList.users)
}