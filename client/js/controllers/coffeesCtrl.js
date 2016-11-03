angular.module('planet_coffee')
  .controller('CoffeesController', CoffeesController)

CoffeesController.$inject = ['$http', '$scope', '$state','CoffeeFactory']

function CoffeesController($http, $scope,$state,CoffeeFactory) {
  var vm = this

  // limit car description length on cars index:
  vm.textLimit = 140

  // get all cars when controller loads:
  //now get the below from factory
//  $http.get('/api/cars')
  CoffeeFactory.index()
    .success(function(data) {
      vm.coffees = data
    })

  vm.createCoffee = function() {
    CoffeeFactory.create(vm.coffee)
      .success(function(data) {
        vm.coffees = data
        $state.go('coffees')
      })
    }
    vm.addCoffee=function(){
    // console.log(vm.newCoffee);
    $http.post(apiUrl,vm.newCoffee)
      .success(function(data){
        //console.log(data);
        vm.coffees.push(data.coffee)
      })
    }

    vm.addToCart = function(coffee){

    }
//vm.destroyCar = function(car, index)
    //vm.destroyCoffee = function(id, index) {
    vm.destroyCoffee = function(coffee) {
      // console.log('entering delete' +coffee);
      CoffeeFactory.destroy(coffee._id)
        .success(function(data){
        //  console.log(data);
          vm.coffees.splice(vm.coffees.indexOf(coffee),1)
          //pure java script way vm.cars.splice(vm.cars.indexOf(car),1)
          //angular way down below ng-repeat creates a loca variable called ng-index that can be accessed anywhere within the scope of ng-repeat. this index has to come from ng-repeat in cars.html as $index. check for that
          //vm.cars.splice(index,1)
        })
    }
}
