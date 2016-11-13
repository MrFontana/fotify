// INITILIZE SERVICE
// ============================================================
angular.module("fotify").service("playlistByIdSrvc", function($http) {

  // CRUD FUNCTIONS
  // ============================================================
  this.getPlaylistSongs = function(user_id, id) {
    return $http({
      method: 'GET',
      url: '/api/playlist/' + user_id + "/" + id
    });
  };


  // OTHER FUNCTIONS
  // ============================================================


});
