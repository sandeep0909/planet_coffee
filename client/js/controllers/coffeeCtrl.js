angular.module('planet_coffee')
  .controller('SingleCoffeeController',SingleCoffeeController)
  //.controller('EditCoffeeController',EditCoffeeController)

  SingleCoffeeController.$inject = ['$stateParams','$state','CoffeeFactory', '$http']
  // EditCoffeeController.$inject = ['$stateParams','$state','CoffeeFactory', '$rootScope']

  function SingleCoffeeController($stateParams,$state,CoffeeFactory,$http){
    var vm = this
    vm.currentUser = {}
    //move the below to factory or service layer
    //$http.get('/api/coffees/'+$stateParams.id)

    CoffeeFactory.show($stateParams.id)
      .success(function(coffee){
        vm.coffee = coffee
        //console.log(vm.coffee);
        vm.selected = true;
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
            vm.selected = true;
            $state.go('coffee')
          })
      }

      vm.addCoffee = function(currentUser) {
        //console.log("lets add coffee");
        //console.log(currentUser);
        if(currentUser){
        $http.post('api/users/' + currentUser._id + '/coffees/' + vm.coffee._id)
          .success(function(data) {
            $state.go('coffees')
          //  console.log(data)
            // vm.currentUser.coffees.push(data.coffee)
          })}
          else {alert("Please login to buy this product")}


  }

  // function EditCoffeeController($stateParams,$state,CoffeeFactory, $rootScope) {
  //   var vm = this
  //   if($rootScope.currentUser.access!=0 || $rootScope.currentUser.access!=1) {
  //     $state.go('home')
  //   }
  // }
}
