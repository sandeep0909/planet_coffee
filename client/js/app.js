angular.module('planet_coffee', ['ui.router', 'ui.bootstrap'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', router])
  .directive('navigationBar', navigationBar)
  .run(function ($rootScope, $location, $state, AuthService) {
    $rootScope.$on("$stateChangeError", console.log.bind(console));
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      AuthService.getUserStatus()
      .then(function(){
        // console.log(toState)
        if (toState.restricted && !AuthService.isLoggedIn()){
          // $location.path('/login')
          $state.go('login');
        }

        //if(toState.restricted && !AuthService.isLoggedIn() && toState.ad)
      })
    })
  })

function router($stateProvider, $urlRouterProvider, $locationProvider) {
  // remove the base '/#/' from the url by using the below: In order for this to work you need a base tag which is in index.html inside head tag<base href="/"
  $locationProvider.html5Mode(true)

  $urlRouterProvider.otherwise('/')
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html'
    })
    .state('coffees', {
      url: '/coffees',
      templateUrl: 'templates/coffees.html',
      controller: 'CoffeesController as cc'
    })
    .state('newCoffee',{
      url:'/coffees/new',
      templateUrl: 'templates/new_coffee.html',
      controller: 'CoffeesController as cc'
    })
    .state('coffee',{
      url:'/coffees/:id',
      templateUrl: 'templates/coffee.html',
      controller: 'SingleCoffeeController as scc'
    })
    .state('editCoffee',{
      url:'/coffees/:id/edit',
      templateUrl: 'templates/edit_coffee.html',
      controller: 'EditCoffeeController as scc',
      restricted: true,
      //admin: true
    })
    .state('login', { // states for login
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginController as loginCtrl'
    })
    .state('logout', {
      url: '/logout',
      controller: 'logoutController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'registerController as registerCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/profile.html',
      controller: 'SingleUserController as scc'
    })

  // })

}



function navigationBar() {
  return {
    restrict: 'E',
    templateUrl: 'partials/nav.html'
  }
}
