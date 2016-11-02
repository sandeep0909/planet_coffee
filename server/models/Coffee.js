var
  mongoose = require('mongoose'),
  coffeeSchema = new mongoose.Schema({
    year: Number,
    name: String,
    country: String,
    description: String,
    image: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }, {timestamps: true})

var Coffee = mongoose.model('Coffee', coffeeSchema)
module.exports = Coffee
