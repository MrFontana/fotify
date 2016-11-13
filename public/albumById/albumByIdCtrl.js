angular.module("fotify").controller("albumByIdCtrl", function($scope, album, ngAudio, albumByIdSrvc) {

  $scope.tracks = album.tracks.items;
  $scope.albumImg = album.images[0].url;
  $scope.albumName = album.name;

  console.log("TRACKS: ", $scope.tracks);

  $scope.preview = function ($index) {
    if ($scope.previewUrl) {
      $scope.previewUrl.pause();
    }
    $scope.previewUrl = ngAudio.load($scope.tracks[$index].preview_url);
    console.log("preview obj: ", $scope.previewUrl);
    $scope.previewUrl.play();
  }

  $scope.addFavorite = function (e, track_id) {
    albumByIdSrvc.addFavorite(track_id).then(function(response){
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
