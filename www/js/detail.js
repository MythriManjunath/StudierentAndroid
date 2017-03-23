studApp.controller('detailCtrl', ['$scope', '$http','$stateParams', '$state', '$timeout', '$ionicFilterBar', '$rootScope',
function($scope, $http,$stateParams, $state, $timeout, $ionicFilterBar, $rootScope) {

    $scope.accResultout = false;
    $scope.accs = [];

    $scope.$on('$ionicView.beforeEnter', function() {
      console.log("Getting stateParams beforeEnter...", $stateParams.accParam);
      $scope.acc = $stateParams.accParam;
    })
    $scope.backToLogin = function() {

      $state.go('rentList');
  
    }
    console.log("Coming to the detail controller...");
    $scope.backToLogin = function() {

      $state.go('rentList');

    }
}]);
