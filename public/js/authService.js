angular.module("fotify").service("authService", function($http) {
  this.getUser = function() {
    return $http.get( '/me' ).then( function ( response ) {
			return response.data;
		} );
  };
});
