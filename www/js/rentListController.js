studApp.controller('rentListCtrl', ['$scope', '$http','$stateParams', '$state', '$timeout', '$ionicFilterBar', '$rootScope', '$ionicLoading', '$ionicSideMenuDelegate','$ionicAuth',
function($scope, $http,$stateParams, $state, $timeout, $ionicFilterBar, rootScope, $ionicLoading, $ionicSideMenuDelegate,$ionicAuth) {



    $scope.accs = [];

    // $scope.offsetAccs = 1;
    // $scope

    $scope.filterText = '';

    $scope.filteredItems = ["balcony", "bike_parking", "cable_tv", "direct_bus_to_uni",
    "electricity_bill_included", "fire_alarm", "garden", "handicap", "heating", "internet", "parking",
    "pets", "smoking", "washin_machine"];
    $scope.amenities = [];


    console.log("Coming to the rentlist controller...");

  var backHandler = $scope.$on('onBack', function(event) {
  console.log("backBusy normal is..", $scope.backBusy);
  console.log("Coming back to the org.");
  console.log("value of pCounter is", rootScope.pCounter);
    console.log("calling only once");
  console.log("qeeOrgOp orgs are..", qeeOrgOp.orgs);


});

$scope.selectAcc = function( acc) {

    console.log("Selected acc is...", acc);
    $state.go('detail', {accParam: acc});

}

$scope.hide = function(){
      $ionicLoading.hide();
};

$scope.$on('$ionicView.beforeEnter', function() {
  console.log("coming to rentListController..");
  if($stateParams.filterParam != null) {
      console.log("Getting filterParam beforeEnter...", $stateParams.filterParam);
      $scope.filterData = $stateParams.filterParam;
      $scope.show();
      $scope.searchWithFilters($scope.filterData)
      .success(function(accs) {

          console.log("Success...", accs);
          if(accs) {
            var resultAccs = [];

              for( var i=0; i<accs.properties.length; i++) {
                  var acc = $scope.makeAcc( accs.properties[i]);
                  console.log("acc object is...", acc);
                  resultAccs.push( acc);
                }
                console.log("resultAccs..", resultAccs);
                $scope.hide();
                $timeout(function() {
                  // $scope.accResultout = true;
                  $scope.accs = resultAccs;
                }, 0);
          }
      })
      .error(function(error){
          console.log("Error is...", error);
      });
  }
  else {
    $scope.show();
      $scope.getAccs();


  }

})

$scope.getAccs = function() {

    $scope.requestAccs()
     .success(function( accs) {
        console.log("accs are...", accs);

        var resultAccs = [];

          for( var i=0; i<accs.properties.length; i++) {
              var acc = $scope.makeAcc( accs.properties[i]);
              console.log("acc object is...", acc);
              resultAccs.push( acc);
            }
            console.log("resultAccs..", resultAccs);
            $scope.hide();
            $timeout(function() {
              // $scope.accResultout = true;
              $scope.accs = resultAccs;
            }, 0);


     })
     .error(function( err) {
       console.log("err is...", err);
     })
     .finally(function( fin) {
       console.log("finally....", fin);
     });

}

$scope.goToFilters = function() {
  console.log("clicking here..going to the filterctrl..");
  $state.go('filter');
}


$scope.requestAccs = function( offset) {

    return $http.get("http://studierent.space/properties/search.json?limit=40");


}


  $scope.toggleLeft = function() {
     $ionicSideMenuDelegate.toggleLeft();
   };

$scope.show = function() {
  $ionicLoading.show({
     template: '<p>"Loading the results..."</p><ion-spinner icon="circles" class="spinner-balanced"></ion-spinner>',
     duration: 2000
  });
};

$scope.searchWithFilters = function( filterData) {

  console.log("SearFilter data is..", filterData);

  if(typeof(filterData.address) === "undefined" || filterData.address === "undefined" || filterData.address === null) filterData.address = "";
  if(typeof(filterData.type) === "undefined" || filterData.type === "undefined" || filterData.type === null) filterData.type = "";
  if(typeof(filterData.min) === "undefined" || filterData.min === "undefined" || filterData.min === null) filterData.min = "";
  if(typeof(filterData.max) === "undefined" || filterData.max === "undefined" || filterData.max === null) filterData.max = "";
  if(typeof(filterData.avalFrom) === "undefined" || filterData.avalFrom === "undefined" || filterData.avalFrom === null) filterData.avalFrom = "";
  if(typeof(filterData.avalTo) === "undefined" || filterData.avalTo === "undefined" || filterData.avalTo === null) filterData.avalTo = "";
  if(typeof(filterData.size) === "undefined" || filterData.size === "undefined" || filterData.size === null) filterData.size = "";
  if(typeof(filterData.fSize) === "undefined" || filterData.fSize === "undefined" || filterData.fSize === null) filterData.fSize = "";


  return $http.get( "http://studierent.space/properties/search.json?address=" + filterData.address + "&type=" + filterData.type + "&min=" + filterData.min + "&max=" + filterData.max + "&avalFrom=" + filterData.avalFrom + "&valTo=" + filterData.avalTo + "&rSize=" + filterData.size + "&fSize=" + filterData.fSize);



}


$scope.$on('searchFilter', function(event, searchText) {
  // $scope.forSearch = true;
  // rootScope.sCounter++;
console.log("coming from search Filter with text..", searchText);
var resultAccs = [];
// $scope.searchBusy = true;
// $scope.backBusy = false;

  $scope.searchAccs( searchText)
  .success( function( accs) {

console.log("calling first one..");
 console.log("The search results are..", accs);
      if(accs) {

          var accsCount = accs.properties.length;

          if(accsCount < 10) {
              console.log("List finished.....");
          }

          console.log("List finished.....", accs.properties);

          for( var i=0; i<accs.properties.length; i++) {
              var acc = $scope.makeAcc( accs.properties[i]);
              console.log("acc object is...", acc);
              resultAccs.push( acc);
            }
            console.log("resultAccs..", resultAccs);
      }
  })
  .error( function( error) {
      console.log("error is", error);
  })
  .finally( function() {
    console.log("coming to finally section", resultAccs);
    $timeout(function() {
  $scope.accs = resultAccs;}, 0);
  });
});

$scope.backToLogin = function() {

  $state.go('login');

}


$scope.showFilterBar = function() {
  // rootScope.returned = false;
  console.log("coming for the filter bar..");
  filterbar = $ionicFilterBar.show({

    items: $scope.accs,
    expression: function (filterText, value, index, array) {
    },
    update: function ( filteredItems, text) {
      // $scope.orgs = filteredItems;
      console.log("searched text is", text);

    }
  });

};

$scope.searchAccs = function( searchString) {

    console.log("search string is....", searchString);
    var queryString = searchString;


    return $http.get( "http://studierent.space/properties/search.json?address" + "=" + searchString);


};



$scope.makeAcc = function( acc) {

  var localAcc = {};

  localAcc.address = acc.address;
  localAcc.contact_number = acc.contact_number;
  localAcc.description = acc.description;
  localAcc.title = acc.title;
  localAcc.type = acc.type;
  localAcc.total_size = acc.total_size;
  localAcc.img = "img/studierent_logo.png";
  localAcc.image = acc.images[0].path;
  localAcc.image = "http://www.studierent.space/img/properties/" + localAcc.image;


  localAcc.rent = acc.rent;
  localAcc.amenities = [];

  for( amen of $scope.filteredItems) {
    localAcc[amen] =  acc[amen];
  }

  return localAcc;



};

$scope.showlogout = function() {
  $ionicLoading.show({
     template: '<p>"Logging off.."</p><ion-spinner icon="circles" class="spinner-balanced"></ion-spinner>',
     duration: 2000
  });
};

   $scope.logout = function(){
        $ionicAuth.logout();
        $scope.showlogout($ionicLoading);
        $state.go('login');
    }


}]);
