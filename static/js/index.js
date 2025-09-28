window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}


document.addEventListener('DOMContentLoaded', function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    // Initialize simple carousel
    initializeCarousel();

    // Initialize other carousels (if any) with bulmaCarousel
    try {
      var options = {
        slidesToScroll: 1,
        slidesToShow: 3,
        loop: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 3000,
      }
      
      // Initialize other carousels (not the background one)
      var carousels = bulmaCarousel.attach('.carousel:not(#background-carousel)', options);
    } catch(e) {
      console.log('BulmaCarousel not available or error:', e);
    }

    // Interpolation functionality
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    try {
      bulmaSlider.attach();
    } catch(e) {
      console.log('BulmaSlider not available or error:', e);
    }
});