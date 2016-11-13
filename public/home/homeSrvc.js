// INITILIZE SERVICE
// ============================================================
angular.module("fotify").service("homeSrvc", function($http) {

  // CRUD FUNCTIONS
  // ============================================================
  this.getArtist = function(searchText) {
    return $http({
      method: 'GET',
      url: '/api/artist/' + searchText
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
      console.log(response);
      return response;
    });
  };

  // this.editCollection = function(id, collection) {
  //   return $http({
  //     method: 'PUT',
  //     url: "/collection/" + id,
  //     data: collection
  //   }).then(function(response) {
  //     return response;
  //   });
  // };
  // this.deleteCollection = function(id) {
  //   return $http({
  //     method: 'DELETE',
  //     url: '/collection/' + id
  //   }).then(function(response) {
  //     return response;
  //   });
  // };
  //
  // // OTHER FUNCTIONS
  // // ============================================================


});
