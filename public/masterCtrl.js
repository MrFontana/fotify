angular.module("fotify").controller("masterCtrl", function($rootScope, $scope, $state) {


  $scope.stateName = $state.current.name;
  $rootScope.$on('$stateChangeStart',
  function(event, toState, toParams, fromState, fromParams){
    $scope.stateName = toState.name.toUpperCase();
  });

});
