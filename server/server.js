var
  dotenv = require('dotenv').load({silent: true}),
  express = require('express'),
  app = express(),
  http = require('http').Server(app);
  logger = require('morgan'),
  mongoose = require('mongoose'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  expressSession = require('express-session'),
  mongoStore = require('connect-mongo')(expressSession),
  hash = require('bcrypt-nodejs'),
  path = require('path'),
  passport = require('passport'),
  passportConfig = require('./config/passport.js'),
  coffeeRoutes = require('./routes/coffees.js'),
  apiRoutes = require('./routes/api.js'),
  userRoutes = require('./routes/users.js'),

  // coffeeRoutes = require('./routes/coffees.js')
// PORT = process.env.port || 8000;
  PORT = process.env.port
var mongoConnectionString = process.env.MONGO_URL
//var mongoConnectionString = process.env.MONGO_URL

  //Heroku database connection
  mongoose.connect(mongoConnectionString, function(err) {
    if (err) {
        console.log("Problem connecting to Mongo. Check if mongod is activated")
    } else {
        console.log("Connected to Mongo!")
    }
})

//Local database connection
// mongoose.connect('mongodb://localhost/planet_coffee', function(err) {
//   if (err) {
//       console.log("Problem connecting to Mongo. Check if mongod is activated")
//   } else {
//       console.log("Connected to Mongo!")
//   }
// })

  // mongoose.connect('mongodb://localhost/planet_coffee', function(err) {

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
    saveUninitialized: false,
    store: new mongoStore({url: mongoConnectionString})
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))

//app.use(express.static('client'))

// routes
app.use('/api', userRoutes)
app.use('/api', coffeeRoutes)
app.use('/user', apiRoutes)

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
