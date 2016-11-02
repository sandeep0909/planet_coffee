var
  express = require('express'),
  coffeesRouter = express.Router(),
  coffeesCtrl = require('../controllers/coffees.js')

coffeesRouter.route('/coffees')
  .get(coffeesCtrl.index)
  .post(coffeesCtrl.create)

coffeesRouter.route('/coffees/:id')
  .get(coffeesCtrl.show)
  .patch(coffeesCtrl.update)
  .delete(coffeesCtrl.destroy)

//coffeesRouter.get('/seed', coffeesCtrl.seed)

module.exports = coffeesRouter
