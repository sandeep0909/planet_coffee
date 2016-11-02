angular.module('planet_coffee')
  .controller('SingleCoffeeController',SingleCoffeeController)
  .controller('EditCoffeeController',EditCoffeeController)

  SingleCoffeeController.$inject = ['$stateParams','$state','CoffeeFactory']
  EditCoffeeController.$inject = ['$stateParams','$state','CoffeeFactory', '$rootScope']

  function SingleCoffeeController($stateParams,$state,CoffeeFactory){
    var vm = this
    //move the below to factory or service layer
    //$http.get('/api/coffees/'+$stateParams.id)

    CoffeeFactory.show($stateParams.id)
      .success(function(coffee){
        vm.coffee = coffee
        console.log(vm.coffee);
      })

      vm.destroyCoffee = function(coffee){
        CoffeeFactory.destroy(vm.coffee._id)
          .success(function(data){
            $state.go('coffees')
          })
      }

      vm.updateCoffee = function(){
        CoffeeFactory.update(vm.coffee)
          .success(function(data){
            $state.go('coffees')
          })
      }
  }

  function EditCoffeeController($stateParams,$state,CoffeeFactory, $rootScope) {
    var vm = this
    if($rootScope.currentUser.access < 1) {
      $state.go('home')
    }
  }
