var
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  expressSession = require('express-session'),
  hash = require('bcrypt-nodejs'),
  path = require('path'),
  passport = require('passport'),
  passportConfig = require('./config/passport.js'),
  apiRoutes = require('./routes/coffees.js')
  // coffeeRoutes = require('./routes/coffees.js')
  PORT = process.env.port || 8000;

  mongoose.connect('mongodb://localhost/planet_coffee', function(err) {
  console.log(err || "Connected to MongoDB (planet_coffee)")
})

// user schema/model
var User = require('./models/User.js')


// require routes
var routes = require('./routes/api.js')
var userRoutes = require('./routes/users.js')


// define middleware
app.use(express.static(path.join(__dirname, '../client')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))

//app.use(express.static('client'))

// routes
app.use('/user/', routes)
app.use('/api', apiRoutes)

app.get('*', function(req, res) {
  res.sendFile('/client/index.html', {root: './'})
})


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'))
})

// error hndlers
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res) {
  res.status(err.status || 500)
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }))
})

app.listen(PORT, function(err) {
  console.log(err || "Server running on port for planet coffee " + PORT)
})
