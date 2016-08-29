angular.module('starter.controllers', ['ngCordova'])

.controller('DirectionsCtrl', function($scope, data) {
  $scope.data = data;

  //initialize map
  mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VyYXJkbmciLCJhIjoiY2lxbjJjN20xMDB2MmZrbmhiaGIzNWVtYSJ9.p6btnHa0blwAknK5ygbqeg';
  var map = new mapboxgl.Map({
    container: 'directionsMap',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-123.1, 49.1],
    zoom: $scope.data.selectedZoom
  });

  //initialize map settings each time directions.html comes into active view
  $scope.$on('$ionicView.enter', function () {
    alert("Initializing " + $scope.data.selectedMapType + " styled map");
    map.setStyle('mapbox://styles/mapbox/' + $scope.data.selectedMapType + '-v9');
    map.setLayoutProperty('country-label-lg', 'text-field', '{' + $scope.data.selectedMapType + '}');
    if ($scope.data.disablesScrollZoom) {
      map[scrollZoom].disable();
    } else {
      map[scrollZoom].enable();
    }
    if ($scope.data.disableDragPan) {
      map[dragPan].disable();
    } else {
      map[dragPan].enable();
    }
    if ($scope.data.disableDoubleClickZoom) {
      map[doubleClickZoom].disable();
    } else {
      map[doubleClickZoom].enable();
    }
  });


  // directions control
  map.addControl(new mapboxgl.Directions());

})

.controller('SettingsCtrl', function($scope, data, $cordovaToast) {
  $scope.data = data;


  //indicate settings is saved when the view is about to leave and no longer be the active view.
  $scope.$on('$ionicView.beforeLeave', function () {
    // please wrap each cordova plugin with deviceready function
    $ionicPlatform.ready(function() {
      $cordovaToast.showShortBottom("Leaving view");
    });
  });

  // Update mostly true/false boolean options
  $scope.updateSettings = function() {
    if (!$scope.value) {
      $scope.value = true;
    } else {
      $scope.value = false;
    }
  }

})

// loading 2 maps is resource costly and lags the app
.controller('ExploreCtrl', function($scope, data) {
  $scope.data = data;


})

// factory to share data between different controllers
.factory('data',function() {
  return {
    selectedMapType: 'basic',
    selectedMapLanguage: 'name_en',
    selectedZoom: '14',
    disablesScrollZoom: 'false',
    disableDragPan: 'false',
    disableDoubleClickZoom: 'false'
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

