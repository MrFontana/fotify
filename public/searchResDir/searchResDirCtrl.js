// INITILIZE CONTROLLER
// ============================================================
angular.module("fotify").controller("searchResDirCtrl", function($scope, searchSrvc, $timeout, ngAudio, $state, $window) {

  // VARIABLES
  // ============================================================
  $scope.artistLimit = 4;
  $scope.trackLimit = 4;
  $scope.featureLimit = 4;

  // FUNCTIONS
  // ============================================================

  $scope.test = function(){
    // $(function(){
      // $(".searchContainer").css('display', 'none');
    // })
  }


  $scope.playlistSongs = function (id) {
    console.log("This is the Playlist, bro " + id);
    searchSrvc.songsInPlaylist(id);

  }

  $scope.preview = function ($index) {
    if ($scope.previewUrl) {
      $scope.previewUrl.pause();
    }
    $scope.previewUrl = ngAudio.load($scope.tracks[$index].preview_url);
    console.log("preview obj: ", $scope.previewUrl);
    $scope.previewUrl.play();
  }

  $scope.addFavorite = function (e, track_id) {
    searchSrvc.addFavorite(track_id).then(function(response){
      if (response.data === "Not logged in.") {
        alert('You must be logged in to add a favorite.');
        $window.location.href = "http://localhost:3000/auth/spotify";
      }
      console.log("ADDED FAVORITE: ", response);
      console.log(e);
      $(e.target).text("✓");
    });
  }

});
