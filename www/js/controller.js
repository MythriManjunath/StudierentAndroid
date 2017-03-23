studApp.controller('menuCtrl', ['$scope','$ionicSideMenuDelegate','$ionicAuth','$state','$ionicLoading',
function($scope, $ionicSideMenuDelegate,$ionicAuth, $state,$ionicLoading) {

  $scope.toggleLeft = function() {
     $ionicSideMenuDelegate.toggleLeft();
   };

   $scope.show = function() {
     $ionicLoading.show({
        template: '<p>"Logging out..."</p><ion-spinner icon="circles" class="spinner-balanced"></ion-spinner>',
        duration: 2000
     });
   };

   $scope.goToProps = function() {
      console.log("clicking here..going to the rentListCtrl..");
      $state.go('rentList');

   }

   $scope.goToFilters = function() {
     console.log("clicking here..going to the filterctrl..");
     $state.go('filter');
   }


   $scope.logout = function(){
        $ionicAuth.logout();
        $scope.show($ionicLoading);
        $state.go('login');
    }

}]);
