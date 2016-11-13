// INITILIZE CONTROLLER
// ============================================================
angular.module("fotify").controller("playlistByIdCtrl", function($scope, tracks, ngAudio, playlistsSrvc) {

  // VARIABLES
  // ============================================================
  $scope.tracks = tracks.tracks.items;
  $scope.playlistImg = tracks.images[0].url;
  $scope.playlistName = tracks.name;

  console.log("TRACKS: ", tracks);

  $scope.preview = function ($index) {
    if ($scope.previewUrl) {
      $scope.previewUrl.pause();
    }
    $scope.previewUrl = ngAudio.load($scope.tracks[$index].track.preview_url);
    console.log("preview obj: ", $scope.previewUrl);
    $scope.previewUrl.play();
  }


  // FUNCTIONS
  // ============================================================


});
