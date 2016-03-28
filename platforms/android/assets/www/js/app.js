var app=angular

  .module('routineApp',['ionic','ngStorage','ui.router','myFactory','myController','ngMaterial'])

  .run(function($rootScope, $ionicPlatform, $ionicHistory){
  $ionicPlatform.registerBackButtonAction(function(e){
    if ($rootScope.backButtonPressedOnceToExit) {
      ionic.Platform.exitApp();
    }

    else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    }
    else {
      $rootScope.backButtonPressedOnceToExit = true;
      ionic.Platform.exitApp();

      window.plugins.toast.showShortCenter(

        "Press back button again to exit",function(a){},function(b){}
      );
      setTimeout(function(){
        $rootScope.backButtonPressedOnceToExit = false;
      },1000);
    }
    e.preventDefault();
    return false;
  },101);

})

  .config(function($stateProvider, $urlRouterProvider){

    /*$urlRouterProvider.otherwise('/tabbar');

    $stateProvider
      .state('home',{
        url: "/home",
        templateUrl:'templates/config.html'
      })

      .state('tabbar',{
        url: "/tabbar",
        templateUrl:'templates/tabs.html',
        controller:'GlobalController'
      })

      .state('day0',{
        url:"/day0",
        templateUrl:'templates/monday.html',
        controller:'GlobalController'
      })

      .state('day1',{
        url:"/day1",
        templateUrl:'templates/monday.html',
        controller:'GlobalController'
      })

      .state('day2',{
        url:"/day2",
        templateUrl:'templates/tuesday.html',
        controller:'GlobalController'
      })

      .state('day3',{
        url:"/day3",
        templateUrl:'templates/wednesday.html',
        controller:'GlobalController'
      })

      .state('day4',{
        url:"/day4",
        templateUrl:'templates/thursday.html',
        controller:'GlobalController'
      })

      .state('day5',{
        url:"/day5",
        templateUrl:'templates/friday.html',
        controller:'GlobalController'
      })

      .state('day6',{
        url:"/day6",
        templateUrl:'templates/monday.html',
        controller:'GlobalController'
      })

  })
*/

    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('day0', {
        url: "/day0",
        templateUrl: "templates/monday.html"
      })
      .state('day1', {
        url: "/day1",
        templateUrl: "templates/tuesday.html"
      })
      .state('day2', {
        url: "/day2",
        templateUrl: "templates/wednesday.html"
      })
      .state('day3', {
        url: "/day3",
        templateUrl: "templates/thursday.html"
      })
      .state('day4', {
        url: "/day4",
        templateUrl: "templates/friday.html"
      })
      /*.state('tabs', {*/
      /*  url: "/tabs",*/
      /*  templateUrl: "templates/tabs.html"*/
      /*})*/
    $stateProvider
      .state('home',{
        url: "/home",
        templateUrl:'templates/config.html'
      })
    $stateProvider
      .state('sidenav',{
        url: "/sidenav",
        templateUrl:'templates/sidenav.html',
        controller:'sideController'
      })
    ;
  })

  .controller('tabCtrl', function($scope, $location) {
   /* $scope.selectedIndex = 0;*/

    $scope.onSwipeRight = function (){
      if ($scope.selectedIndex < 4){
        $scope.selectedIndex  = $scope.selectedIndex + 1;
      }
      // if you want to make all the tour
      else{
        $scope.selectedIndex  = 0;
      }
    }

    $scope.onSwipeLeft = function () {

      if ($scope.selectedIndex > 0){
        $scope.selectedIndex  = $scope.selectedIndex - 1;
      }
      // if you want to make all the tour
      else {
        $scope.selectedIndex  = 4;
      }
    }

    $scope.$watch('selectedIndex', function(current) {
      switch (current) {
        case 0:
          $location.url("/day0");
          break;
        case 1:
          $location.url("/day1");
          break;
        case 2:
          $location.url("/day2");
          break;
        case 3:
          $location.url("/day3");
          break;
        case 4:
          $location.url("/day4");
          break;
      }
    });
  })

  .controller('sideController', function($scope, $mdSidenav,$log) {
  $scope.openRightMenu = function() {
    $mdSidenav('right').toggle()
      .then(function () {
        $log.debug("Toggle is trigerred");
      });
  };
})
;
