var
  Coffee = require('../models/Coffee.js');


module.exports = {
  index,
  show,
  create,
  update,
  destroy
}

function index(req, res) {
  Coffee.find({}, function(err, coffees) {
    if(err) return console.log(err)
    res.json(coffees)
  })
}

function show(req, res) {
  Coffee.findById(req.params.id, function(err, coffee) {
    if(err) return console.log(err)
    res.json(coffee)
  })
}

function create(req, res) {
  console.log("BOOOOOOOOOOOOOM");

  Coffee.create(req.body, function(err, coffee) {
    console.log(req);
    if(err) return console.log(err)
    res.json({success: true, message: "New Coffee created! ", coffee: coffee})
  })

}

function update(req, res) {
  Coffee.findByIdAndUpdate(req.params.id, req.body, {new: true},function(err, coffee) {
    if(err) return console.log(err)
    res.json({success: true, message: "Coffee  updated!", coffee: coffee})
  })
}

function destroy(req, res) {
  Coffee.findByIdAndRemove(req.params.id, function(err) {
    if(err) return console.log(err)
    res.json({success: true, message: "Coffee deleted "})
  })
}

// function seed(req, res) {
//   Coffee.remove({}, function(err) {
//     if(err) return console.log(err)
//     Coffee.insertMany(seeds, function(err, cars) {
//       if(err) return console.log(err)
//       res.json({success: true, message: "Cars created! 🚗 🚗 🚗 🚗 🚗 🚗 🚗", cars: cars})
//     })
//   })
// }
