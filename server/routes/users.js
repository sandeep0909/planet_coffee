var
  userRouter = require('express').Router(),
  User = require('../models/User.js'),
  Coffee = require('../models/Coffee.js')

userRouter.route('/users')
  .get(function(req, res) {
    User.find({}).populate('coffees').exec(function(err, users) {
      if(err) return console.log(err)
      res.json(users)
    })
  })

userRouter.route('/users/:id')
  .get(function(req, res) {
    User.findById(req.params.id).populate('coffees').exec(function(err, user) {
      if(err) return console.log(err)
      res.json(user)
    })
  })

  userRouter.route('/users/:id/coffees')
    .get(function(req, res) {
      console.log("entrieng user coffees function");
      User.findById(req.params.id).populate('coffees').exec(function(err, user) {
        if(err) return console.log(err)
        res.json(user.coffees)
      })
    })

  userRouter.route('/users/:id/coffees/:coffee_id')
    .post(function(req, res) {
      User.findById(req.params.id).populate('coffees').exec(function(err, user) {
        if(err) return console.log(err)
        user.coffees.push(req.params.coffee_id)
        Coffee.findById(req.params.coffee_id, function(err, coffee){
          coffee.people.push(user._id)
          coffee.save(function(err){
            user.save(function(err){
              res.json(user)
            })
          })
        })
        //res.json(user)
      })
    })
module.exports = userRouter
