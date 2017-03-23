studApp.controller('filterCtrl', ['$scope', '$http','$stateParams', '$state', '$timeout', '$ionicFilterBar', '$ionicLoading', '$ionicSideMenuDelegate','$ionicAuth',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $state, $timeout, ionicFilterBar, $ionicLoading, $ionicSideMenuDelegate,$ionicAuth) {

console.log("coming for the filter ctrl..");

  $scope.$on("$ionicView.beforeEnter", function(event){
    console.log("Coming for the filter controller..");

    });


  $scope.filterData = {};

  $scope.show = function() {
    $ionicLoading.show({
       template: '<p>"Signing in..."</p><ion-spinner icon="circles" class="spinner-balanced"></ion-spinner>',
       duration: 2000
    });
  };

  $scope.toggleLeft = function() {
     $ionicSideMenuDelegate.toggleLeft();
   };

  $scope.hide = function(){
        $ionicLoading.hide();
  };

  $scope.search = function() {

    $scope.show($ionicLoading);
    console.log("Coming to the login method..");

    console.log("input values are....", $scope.filterData);

    $state.go('rentList', {filterParam: $scope.filterData});
};


$scope.backToLogin = function() {

  $state.go('rentList');

};


   $scope.logout = function(){
        $ionicAuth.logout();
        $scope.show($ionicLoading);
        $state.go('login');
    }

}])
