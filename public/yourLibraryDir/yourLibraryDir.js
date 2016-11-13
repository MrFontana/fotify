// INITILIZE SERVICE
// ============================================================
angular.module("fotify").directive('yourLibraryDir', function() {
    return {
      restrict: 'EA',
      templateUrl: './yourLibraryDir/yourLibraryDir.html',
      controller: 'yourLibraryDirCtrl',
      scope: {
        artists: '=',
        albums: '=',
        tracks: '=',
        playlists: '='
      },
      link: function(scope) {

      }
    };
  });
