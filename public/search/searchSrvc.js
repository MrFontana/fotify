// INITILIZE SERVICE
// ============================================================
angular.module("fotify").service("searchSrvc", function($http) {

  // CRUD FUNCTIONS
  // ============================================================
  this.getArtist = function(searchText) {
    return $http({
      method: 'GET',
      url: '/api/artist/' + searchText
    });
  };
  this.getAlbums = function(artistId) {
    return $http({
      method: 'GET',
      url: '/api/albums/' + artistId
    });
  };
  this.getTracks = function(artistId) {
    return $http({
      method: 'GET',
      url: '/api/tracks/' + artistId
    });
  };
  this.getPlaylistByArtist = function(searchText) {
    return $http({
      method: 'GET',
      url: 'api/playlist/' + searchText
    });
  };
  this.getPlaylists = function() {
    return $http({
      method: 'GET',
      url: '/api/user/playlists'
    });
  };
  this.getCurrentUser = function() {
    return $http({
      method: 'GET',
      url: '/me'
    }).then(function(response) {
      return response;
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
  this.songsInPlaylist = function(id) {
    return $http({
      method: 'GET',
      url: '/api/user/playlists/' + id
    })
      .then(function(response){
        console.log('playlistSongs ' + response);
        return response
    })
  };


  // // OTHER FUNCTIONS
  // // ============================================================


});
