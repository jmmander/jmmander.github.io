// Improved main.js with optimized scrolling and fixed scroll positioning

$(document).ready(function() {
  // Initialize AOS with optimized settings
  AOS.init({
    disable: false,
    duration: 600,
    easing: 'ease-out-cubic',
    once: true,
    mirror: false,
    offset: 120,
    disableMutationObserver: false,
    startEvent: 'DOMContentLoaded'
  });
  
  // Set header height to match window height
  $('.header').height($(window).height());
  
  // Debounced scroll function to improve performance
  var scrollTimeout;
  $(window).on('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      if ($(window).scrollTop() > 50) {
        $('.navbar').addClass('scrolled');
      } else {
        $('.navbar').removeClass('scrolled');
      }
    }, 100);
  });
  
  // Simplified scrolling function with better anchor targeting
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    
    var target = this.hash;
    var $target = $(target);
    
    // Stop any ongoing animations immediately
    $('html, body').stop(true, true);
    
    if ($target.length) {
      // Calculate position to the parent section's top
      var $section = $target.closest('section');
      var navHeight = $('.navbar').outerHeight();
      var targetPosition = $section.offset().top - navHeight;
      
      // Temporarily disable other animations
      $('.content *').css({
        'animation-play-state': 'paused',
        'transition': 'none'
      });
      
      // Perform scroll animation
      $('html, body').animate({
        'scrollTop': targetPosition
      }, {
        duration: 600,  // Faster duration for smoother scrolling
        easing: 'swing',
        complete: function() {
          // Wait a bit before updating URL to ensure animations complete
          setTimeout(function() {
            // Update URL hash after animation completes
            if (history.pushState) {
              history.pushState(null, null, target);
            } else {
              window.location.hash = target;
            }
            
            // Re-enable animations after scroll completes
            $('.content *').css({
              'animation-play-state': 'running',
              'transition': ''
            });
            
            // Refresh AOS after scrolling
            AOS.refresh();
          }, 100);
        }
      });
    }
  });
  
  // Add title attribute to images for accessibility
  $('img').each(function() {
    let o = $(this);
    if (!o.attr('title') && o.attr('alt')) {
      o.attr('title', o.attr('alt'));
    }
  });
  
  // Prevent other scripts from hijacking scroll events
  $(document).on('wheel mousewheel DOMMouseScroll', function(e) {
    // Only prevent default if an animation is in progress
    if ($('html, body').is(':animated')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });
  
  // Prevent animation scripts from hijacking click events
  $(document).on('click', 'a[href^="#"]', function(e) {
    // Stop the event from bubbling up to other handlers
    e.stopPropagation();
  });
  
  // Force refresh AOS when window is resized
  $(window).on('resize', function() {
    setTimeout(function() {
      AOS.refresh();
    }, 500);
  });
  
  // Listen for AOS animation completion to ensure proper scrolling
  document.addEventListener('aos:in', function() {
    // Give a little time for DOM to settle after animations
    setTimeout(function() {
      // If URL has a hash, scroll to it properly after animations
      if (window.location.hash) {
        var hash = window.location.hash;
        var $hash = $(hash);
        if ($hash.length) {
          var navHeight = $('.navbar').outerHeight();
          var additionalOffset = 50;
          var scrollPosition = $hash.offset().top - navHeight - additionalOffset;
          
          // Smooth scroll to the correct position
          $('html, body').animate({
            scrollTop: scrollPosition
          }, 300);
        }
      }
    }, 100);
  });

  // Make entire nav-item clickable by triggering the link's click event
$('.navbar-nav .nav-item').on('click', function(e) {
  // Only trigger if the direct element clicked is the nav-item (not already the link)
  if (e.target === this) {
    $(this).find('.nav-link')[0].click();
  }
});

// Close mobile menu when a link is clicked
$('.navbar-nav .nav-link').on('click', function() {
  if ($(window).width() < 768) {
    $('.navbar-collapse').collapse('hide');
  }
});

// Close mobile menu when clicking outside
$(document).on('click touchstart', function(event) {
  var $navbar = $('.navbar-collapse');
  var $toggleBtn = $('.navbar-toggler');
  
  if ($navbar.hasClass('show')) {
    // Check if click is outside the navbar and not on the toggle button
    if (!$(event.target).closest('.navbar-collapse').length && 
        !$(event.target).is($toggleBtn) && 
        !$(event.target).closest($toggleBtn).length) {
      $navbar.collapse('hide');
    }
  }
});
  
  // Console ASCII art for fun
  console.log("%c　∧＿∧\n（｡･ω･｡)つ━☆・*。\n⊂　　 ノ 　　　・゜+.\nしーＪ　   　　　・゜+.\n　　　     °。+ *´¨\n　　.· ´¸.·*´¨\n   ( .· ´¸.·*´¨) ´¸.·*´¨) ´¸.·*´¨) ¸.·*¨)\n (¸.·´  Welcome to the Console Nebula  ¸.·*¨)\n (¸.·´  We hope you enjoy your journey!  ¸.·*¨)\n (¸.·´  Here you can explore the code base  ¸.·*¨) \n (¸.·´  And inspect all our elements  ¸.·*¨)\n (¸.·´  Thank you for visiting  ¸.·*¨) \n (¸.·´  We hope to see you again! ¸.·*¨) \n (¸.·´ (¸.·'* (¸.·'* ¸.·*¨) ´¸.·*´¨) ´¸.·*´¨)", 'color:cyan ; fontsize:30px; text-align: center; font-weight: bold');
});