// INITILIZE APP
// ============================================================
// CONFIG
// ============================================================
angular.module("fotify", ['ui.router', 'ngAudio'])
  .config(function($stateProvider, $urlRouterProvider) {
  // ASSIGN OTHERWISE
  // ============================================================
  $urlRouterProvider.otherwise('/search');

  // INITILIZE STATES
  // ============================================================
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/home.html',
      controller: 'homeCtrl'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'search/search.html',
      controller: 'searchCtrl'
    })
    .state('browse', {
      url: '/browse',
      templateUrl: 'browse/browse.html',
      controller: 'browseCtrl'
    })
    .state('radio', {
      url: '/radio',
      templateUrl: 'radio/radio.html',
      controller: 'radioCtrl'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'settings/settings.html',
      controller: 'settingsCtrl'
    })
    .state('yourlibrary', {
      url: '/yourlibrary',
      templateUrl: 'yourLibrary/yourLibrary.html',
      controller: 'yourLibraryCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
      controller: 'loginCtrl'
    })
    .state('playlists', {
      url: '/playlists',
      templateUrl: 'playlists/playlists.html',
      controller: 'playlistsCtrl'
    })
    .state('playlist', {
      url: '/playlist/:user_id/:id',
      templateUrl: 'playlistById/playlistById.html',
      controller: 'playlistByIdCtrl',
      resolve: {
        tracks: function (playlistByIdSrvc, $stateParams) {
          return playlistByIdSrvc.getPlaylistSongs($stateParams.user_id, $stateParams.id)
            .then(function(response) {
              console.log("RESPONSE TRACKS: ", response.data);
              return response.data;
            })
        }
      }
    })
    .state('album', {
      url: '/album/:id',
      templateUrl: 'albumById/albumById.html',
      controller: 'albumByIdCtrl',
      resolve: {
        album: function (albumByIdSrvc, $stateParams) {
          return albumByIdSrvc.getAlbumSongs($stateParams.id)
            .then(function(response) {
              console.log("RESPONSE TRACKS: ", response.data);
              return response.data;
            })
        }
      }
    });








});
