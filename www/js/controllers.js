angular.module('starter.controllers', [])

.controller('DirectionsCtrl', function($scope, data) {
  $scope.data = data;


  //initialize map
  mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VyYXJkbmciLCJhIjoiY2lxbjJjN20xMDB2MmZrbmhiaGIzNWVtYSJ9.p6btnHa0blwAknK5ygbqeg';
  var map = new mapboxgl.Map({
    container: 'directionsMap',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-123.1, 49.1],
    zoom: 14
  });

  $scope.$on('$ionicView.enter', function () {
    map.setStyle('mapbox://styles/mapbox/' + $scope.data.selectedMapType + '-v9');
    map.setLayoutProperty('country-label-lg', 'text-field', '{' + $scope.data.selectedMapType + '}');

    });


  // directions control
  map.addControl(new mapboxgl.Directions());

})

.controller('SettingsCtrl', function($scope, data) {
  $scope.data = data;

  $scope.updateSettings = function() {
    //alert($scope.data.selectedMapType);
  };
})

.controller('ExploreCtrl', function($scope, data) {
  $scope.data = data;

  //initialize map
  mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VyYXJkbmciLCJhIjoiY2lxbjJjN20xMDB2MmZrbmhiaGIzNWVtYSJ9.p6btnHa0blwAknK5ygbqeg';
  var map = new mapboxgl.Map({
    container: 'directionsMap',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-123.1, 49.1],
    zoom: 14
  });

  $scope.$on('$ionicView.enter', function () {
    map.setStyle('mapbox://styles/mapbox/' + $scope.data.selectedMapType + '-v9');
    map.setLayoutProperty('country-label-lg', 'text-field', '{' + $scope.data.selectedMapType + '}');
  });

  map.addControl(new mapboxgl.Geocoder());

})

// factory to share data between different controllers
.factory('data',function() {
  return {
    selectedMapType: 'basic',
    selectedMapLanguage: 'name_en'
  };
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || false;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      if($window.localStorage[key] != undefined)
        return JSON.parse($window.localStorage[key] || false );

      return false;
    },
    remove: function(key){
      $window.localStorage.removeItem(key);
    },
    clear: function(){
      $window.localStorage.clear();
    }
  }
}])


; // end of line
