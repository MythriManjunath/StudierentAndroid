studApp.controller('registerCtrl', ['$scope', '$http','$stateParams', '$state', '$timeout', '$ionicFilterBar', '$ionicLoading','$ionicUser', '$ionicAuth',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $state, $timeout, ionicFilterBar, $ionicLoading,$ionicUser,$ionicAuth) {

$scope.registerData = { };

  $scope.show = function() {
    $ionicLoading.show({
       template: '<p>"Signing up..."</p><ion-spinner icon="circles" class="spinner-balanced"></ion-spinner>',
       duration: 2000
    })
  }

  $scope.hide = function(){
        $ionicLoading.hide();
  };


$scope.register = function(){
      $scope.show($ionicLoading);
      console.log("input values are....", $scope.registerData);
      $ionicAuth.signup($scope.registerData).then(function() {
            // `$ionicUser` is now registered
            $ionicAuth.login('basic',$scope.registerData).then(function(){
              $state.go('login');
            });
        }, function(err) {
  for (var e of err.details) {
    switch(e) {
          case e === 'conflict_email':
          alert('A User has already signed up with the supplied e-mail');
          break;
          case e === 'required_email':
          alert('Missing E-mail field');
          break;
          case e === 'required_password':
          alert('Missing Password field');
          break;
          case e === 'conflict_username':
          alert('A User has already signed up with the supplied username.');
          break;
          case e === 'invalid_email':
          alert('The e-mail did not pass validation.');
          break;

      default:
          alert('Registration failed');
  }
  }

});
}
}])
