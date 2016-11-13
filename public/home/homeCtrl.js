// INITILIZE CONTROLLER
// ============================================================
angular.module("fotify")
  .controller("homeCtrl", function($scope, homeSrvc) {

  // VARIABLES
  // ============================================================
    $scope.home = 'home Kinfolk williamsburg fanny pack live-edge keffiyeh, gastropub umami mumblecore stumptown forage. Man braid live-edge mixtape, pabst gentrify ethical everyday carry meh semiotics butcher listicle chillwave. Kogi chartreuse raclette air plant. Craft beer master cleanse bespoke, polaroid YOLO woke ennui ethical williamsburg. Etsy tumblr kitsch sriracha, mumblecore cred XOXO four loko literally. Readymade 90\'s kombucha single-origin coffee craft beer food truck. Kickstarter keytar succulents banh mi hella.'

  // FUNCTIONS
  // ============================================================
  $scope.foundArtist = function (searchText) {
    searchSrvc.getArtist(searchText).then(function (response) {
      console.log("Spotify response: ", response.data.artists.items);
      $scope.gotem = response.data.artists.items;
      console.log($scope.gotem);
      $timeout(function(){
        console.log("Started");
        $("#owl-demo").owlCarousel({

          // autoPlay: 3000, //Set AutoPlay to 3 seconds

          items : 4,
          // itemsDesktop : [1199,3],
          // itemsDesktopSmall : [979, 3]
          itemsDesktopSmall : [979, 3]

        });
      }, 0);

    });
  }(); 
  // this invocation is the answer to my questions on the home page. i will require this for the home ctrl. All carousels must be active and populate data before the user even interacts with the page.



});
