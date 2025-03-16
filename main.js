// Removed scroll animation functions

$(document).ready(function() {
  // Ensure content is visible
  $('.content').css('z-index', '2');
  $('.container').css('z-index', '2');
  $('.content-card').css('z-index', '2');
  
  // Initialize AOS animations with custom settings
  AOS.init({
    disable: false,
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
    anchorPlacement: 'top-bottom'
  });

  // Set header height to match window height
  $('.header').height($(window).height());

  // Navbar background changes on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
  });

  // Smooth scrolling for nav links
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    
    var target = this.hash;
    var $target = $(target);
    
    $('html, body').animate({
      'scrollTop': $target.offset().top
    }, 800, 'swing', function() {
      window.location.hash = target;
    });
  });

  // Add title attribute to images for accessibility
  $('img').each(function() {
    let o = $(this);
    if (!o.attr('title') && o.attr('alt')) {
      o.attr('title', o.attr('alt'));
    }
  });
  
  // Add colorful console message
  console.log("%c🐱 Welcome to the cat nebula! 🐱", 
    'background: linear-gradient(90deg, #FF6B6B, #6B66FF); color: white; font-size: 16px; font-weight: bold; padding: 10px; border-radius: 5px; text-shadow: 1px 1px 2px #333;');
  console.log("%cThanks for exploring! Feel free to check out the code.", 
    'color: #6B66FF; font-size: 14px;');
});