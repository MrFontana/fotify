// INITILIZE DIRECTIVE
// ============================================================
angular.module("fotify").directive('searchResDir', function() {
  return {
    restrict: 'EA',
    templateUrl: './searchResDir/searchResDir.html',
    controller: 'searchResDirCtrl',
    scope: {
      albums: '=',
      artists: '=',
      tracks: '=',
      playlists: '='
    },
    link: function(scope) {

    }
  };
});
