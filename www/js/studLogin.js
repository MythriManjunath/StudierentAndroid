studApp.controller('loginCtrl', ['$scope', '$http','$stateParams', '$state', '$timeout', '$ionicFilterBar', '$ionicLoading', '$ionicUser', '$ionicAuth',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $state, $timeout, ionicFilterBar, $ionicLoading, $ionicUser, $ionicAuth) {

  $scope.$on("$ionicView.beforeEnter", function(event){
    console.log("Coming for the login controller..");

    });

  $scope.loginData = {};

 //if ($ionicAuth.isAuthenticated()) {
        // Make sure the user data is going to be loaded
    //   $ionicUser.load().then(function() {});
    //  $state.go('menu');
//  }

  $scope.show = function() {
    $ionicLoading.show({
       template: '<p>"Signing in..."</p><ion-spinner icon="circles" class="spinner-balanced"></ion-spinner>',
       duration: 2000
    });
  };

  $scope.hide = function(){
        $ionicLoading.hide();
  };

/*$scope.login = function(){
  console.log("input values are....", $scope.loginData);
      $scope.show($ionicLoading);
        $ionicAuth.login('basic', $scope.loginData).then(function(){
          console.log("Coming for the login auth..");
            $state.go('rentList');
            console.log("Going for menu control..");
        }, function(err) {
  alert('Error Logging in');

});
    }*/
$scope.register = function() {
    $scope.show($ionicLoading);
     $state.go('register');
};

$scope.login = function() {
    $scope.show($ionicLoading);
     $state.go('rentList');
};
$scope.forgotpassword = function() {
    $scope.show($ionicLoading);
     $state.go('$ionicAuth.passwordResetURL');
};
}])
