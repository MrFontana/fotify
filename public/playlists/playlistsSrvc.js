// INITILIZE SERVICE
// ============================================================
angular.module("fotify").service("playlistsSrvc", function($http) {

  // CRUD FUNCTIONS
  // ============================================================
  this.getPlaylists = function() {
    return $http({
      method: 'GET',
      url: '/api/user/playlists'
    })
      .then(function(response) {
      console.log(response.data);
      return response.data;
    });
  };
  this.getCurrentUser = function() {
    return $http({
      method: 'GET',
      url: '/me'
    })
      .then(function(response) {
      return response;
    });
  };

  // OTHER FUNCTIONS
  // ============================================================


});
