angular.module('planet_coffee')
  .controller('MyCoffeesController', MyCoffeesController)

MyCoffeesController.$inject = ['$http', '$scope', '$state']

function MyCoffeesController($http, $scope,$state) {
  var vm = this
  console.log(vm);
  vm.textLimit = 140
  vm.coffees = [];

  vm.loadMyOrders = function(currentUser){
    // console.log("Loading orders");
    $http.get('/api/users/' + currentUser._id + '/coffees')
    .success(function(data) {
      // console.log("my orders are " + data);
      vm.coffees = data
    })
  }
}
