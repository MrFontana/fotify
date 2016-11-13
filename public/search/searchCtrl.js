// INITILIZE CONTROLLER
// ============================================================
angular.module("fotify").controller("searchCtrl", function($scope, searchSrvc, $timeout, ngAudio) {

  // VARIABLES
  // ============================================================

  $scope.refresh = true;
// $scope.search = 'search Kinfolk williamsburg fanny pack live-edge keffiyeh, gastropub umami mumblecore stumptown forage. Man braid live-edge mixtape, pabst gentrify ethical everyday carry meh semiotics butcher listicle chillwave. Kogi chartreuse raclette air plant. Craft beer master cleanse bespoke, polaroid YOLO woke ennui ethical williamsburg. Etsy tumblr kitsch sriracha, mumblecore cred XOXO four loko literally. Readymade 90\'s kombucha single-origin coffee craft beer food truck. Kickstarter keytar succulents banh mi hella.'

// FUNCTIONS
// ============================================================
$scope.getUser = function () {
  searchSrvc.getCurrentUser().then(function(response) {
    console.log(response.data);
    // $scope.searchArtist(searchText);
  });
}
$scope.getUser();

$scope.searchArtist = function (searchText) {
  $scope.refresh = false;

  searchSrvc.getArtist(searchText)
    .then(function (response) {
        $scope.artists = response.data.artists.items;
        for (var i = 0; i < $scope.artists.length; i++) {
          if (!$scope.artists[i].images[2]) {
            $scope.artists[i].images = [];
            $scope.artists[i].images[2] = {
              url: 'http://sourcesandsolutions.net/files/9613/7608/5973/mic-icon.png'
            };
          }
        }

        searchSrvc.getAlbums($scope.artists[0].id)
          .then(function (response) {
            console.log("Artist albums: ", response.data.items);
              $scope.albums = response.data.items;
              setTimeout(function () {
                $("#album-carousel").owlCarousel({

                  // autoPlay: 100000000000000000000, //code breaks without enabling timed autplay. so, you know, i put it at a huge increment

                  items : 5,
                  // itemsDesktop : [1199,3],
                  // itemsDesktopSmall : [979, 3],
                  itemsDesktopSmall : [1200, 5],
                  itemsMobile: [479, 3]

                });
              },100);
          });
        searchSrvc.getTracks($scope.artists[0].id)
          .then(function (response) {
            console.log("Artist Tracks: ", response.data.tracks);
              $scope.tracks = response.data.tracks;
              $scope.refresh = true;
          });
        searchSrvc.getPlaylistByArtist(searchText)
          .then(function (response) {
            console.log("Artist Playlists: ", response.data.playlists.items);
              $scope.playlists = response.data.playlists.items;
              setTimeout(function () {
              $("#playlist-carousel").owlCarousel({

                // autoPlay: 100000000000000000000, //code breaks without enabling timed autplay. so, you know, i put it at a huge increment

                items : 5,
                // itemsDesktop : [1199,3],
                // itemsDesktopSmall : [979, 3],
                itemsDesktopSmall : [1200, 5],
                itemsMobile: [479, 3]

              });
            },100);
          });
    });
}

$scope.getScope = function() {
  return $scope;
}


});
