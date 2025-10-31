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

// 卡片展开/折叠功能
function toggleCard(header) {
  const card = header.parentElement;
  const content = card.querySelector('.card-content');
  const icon = header.querySelector('.icon i');
  
  // 切换激活状态
  header.classList.toggle('active');
  content.classList.toggle('expanded');
  
  // 更新图标
  if (header.classList.contains('active')) {
    icon.className = 'fas fa-chevron-up';
  } else {
    icon.className = 'fas fa-chevron-down';
  }
}

// 手风琴展开/折叠功能
function toggleAccordion(header) {
  const content = header.nextElementSibling;
  const icon = header.querySelector('.accordion-icon');
  
  // 切换激活状态
  header.classList.toggle('active');
  content.classList.toggle('expanded');
  
  // 更新图标
  if (header.classList.contains('active')) {
    icon.textContent = '-';
  } else {
    icon.textContent = '+';
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 可以在这里添加默认展开某些部分
  // 例如：默认展开第一个卡片
  // const firstHeader = document.querySelector('.card-header');
  // if (firstHeader) toggleCard(firstHeader);
});