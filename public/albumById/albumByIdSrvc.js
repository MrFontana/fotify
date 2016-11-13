// INITILIZE SERVICE
// ============================================================
angular.module("fotify").service("albumByIdSrvc", function($http) {

  // CRUD FUNCTIONS
  // ============================================================
  this.getAlbumSongs = function(id) {
    return $http({
      method: 'GET',
      url: '/api/album/' + id
    });
  };

  this.addFavorite = function(track_id){
    return $http({
      method: 'POST',
      url: '/db/favorites',
      data: {
        track_id: track_id
      }
    })
  };


  // OTHER FUNCTIONS
  // ============================================================


});
