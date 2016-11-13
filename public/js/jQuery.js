$(document).ready(function() {
  $("[data-toggle]").click(function() {
    var toggle_el = $(this).data("toggle");
    $(toggle_el).toggleClass("open-sidebar");
  });
  // 
  // $("#owl-demo").owlCarousel({
  //
  //   autoPlay: 3000, //Set AutoPlay to 3 seconds
  //
  //   items : 4,
  //   itemsDesktop : [1199,3],
  //   itemsDesktopSmall : [979,3]
  //
  // });
});
