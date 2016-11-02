//this will contain all the methods for making all API calls
angular.module('planet_coffee')
//the factory command makes the service
  .factory('CoffeeFactory',['$http', CoffeeFactory])
// factory return object of method. Nothing else
  function CoffeeFactory($http){
    return {
      index: index,
      show:show,
      destroy: destroy,
      update: update,
      create:create
    }
    function index(){
      return $http.get('/api/coffees')
    }
    function show(id){
      console.log("going to show in server");
      return $http.get('/api/coffees/'+id)
    }
    function destroy(id){
      return $http.delete('/api/coffees/'+id)
    }
    function update(coffee){
      return $http.patch('/api/coffees/'+ coffee._id, coffee)
    }
    function create(coffee){
      console.log("going to factory");
      return $http.post('/api/coffees',coffee )
    }
  }
