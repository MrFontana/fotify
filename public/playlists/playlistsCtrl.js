// INITILIZE CONTROLLER
// ============================================================
angular.module("fotify").controller("playlistsCtrl", function($scope, playlistsSrvc) {

  // VARIABLES
  // ============================================================
  $scope.getUser = function () {
    playlistsSrvc.getCurrentUser().then(function(response) {
      console.log(response.data);
      // $scope.searchArtist(searchText);
    });
  }
  $scope.getUser();

  $scope.getPlaylists = function() {
    playlistsSrvc.getPlaylists()
      .then(function(response) {
        $scope.playlists = response.items;
      })
  }();

  // FUNCTIONS
  // ============================================================
$scope.playlistLimit = 100;

});
