var express = require('express')
var questionController = require('./controllers/QuestionController')
var roomController = require('./controllers/RoomController')

const route = express.Router()

route.get('/', (req, res) => res.render('index', { page: 'enter-room' }))

route.get('/room/:room', roomController.open)
route.post('/enterroom', roomController.enter)
route.post('/create-room', roomController.create)

route.get('/create-pass', (req, res) =>
  res.render('index', { page: 'create-pass' })
)

route.post('/question/:room/create', questionController.create)
route.post('/question/:room/:question/:slug', questionController.update)

module.exports = route
