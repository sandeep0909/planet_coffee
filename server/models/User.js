
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')

var User = new Schema({
  username: String,
  password: String,
  access:{type:Number, default:1},
  //orders:[{type: mongoose.Schema.Types.ObjectId, ref: 'Coffee'}],
  coffees: [{type: mongoose.Schema.Types.ObjectId, ref: 'Coffee'}]
})

User.plugin(passportLocalMongoose)
module.exports = mongoose.model('users', User)
