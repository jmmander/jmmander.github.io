// Heart Confetti Animation for Badges
(function() {
  // Store created hearts to clean them up
  let heartElements = [];
  
  // Heart SVG path
  const heartPath = "M11.6.7A4.331,4.331,0,0,0,8,2.7,4.331,4.331,0,0,0,4.4.7,4.439,4.439,0,0,0,0,5.1C0,9.5,8,16,8,16s8-6.5,8-10.9A4.439,4.439,0,0,0,11.6.7Z";
  
  // Colors for different badge types
  const badgeColors = {
    'badge-primary': 'rgb(106, 163, 137)', // greenShadeA 
    'badge-success': 'rgb(89, 146, 187)',  // blueShadeA
    'badge-warning': 'rgb(121, 89, 187)',  // purpleShadeA
    'badge-info': 'rgb(187, 89, 146)'      // pinkShadeA
  };
  
  // Function to create hearts animation
  function createHearts(event) {
    // Use actual click coordinates
    const clickX = event.clientX || event.touches?.[0]?.clientX || 0;
    const clickY = event.clientY || event.touches?.[0]?.clientY || 0;
    
    // Get badge element - we need to find the parent badge from the overlay
    const overlay = event.currentTarget;
    const badge = overlay.parentElement;
    
    // Get badge color
    let heartColor = 'rgb(240, 168, 209)'; // Default color (pinkShadeC)
    
    // Check each badge class and assign correct color
    if (badge.classList.contains('badge-primary')) {
      heartColor = badgeColors['badge-primary'];
    } else if (badge.classList.contains('badge-success')) {
      heartColor = badgeColors['badge-success'];
    } else if (badge.classList.contains('badge-warning')) {
      heartColor = badgeColors['badge-warning'];
    } else if (badge.classList.contains('badge-info')) {
      heartColor = badgeColors['badge-info'];
    }
    
    // Clear any existing hearts
    heartElements.forEach(heart => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    });
    heartElements = [];
    
    // Create 6 hearts
    for (let i = 0; i < 6; i++) {
      // Create evenly spaced angles around a circle
      const angle = (i * (2 * Math.PI / 6));
      const distance = 80; // Fixed distance for an even circle
      
      // Calculate end positions from click point
      const endX = clickX + Math.cos(angle) * distance;
      const endY = clickY + Math.sin(angle) * distance;
      
      // Create heart element
      const heart = document.createElement('div');
      heartElements.push(heart);
      heart.style.position = 'fixed';
      heart.style.zIndex = '9999';
      heart.style.pointerEvents = 'none';
      heart.style.top = '0';
      heart.style.left = '0';
      heart.style.transform = `translate(${clickX}px, ${clickY}px) scale(0)`;
      heart.style.opacity = '1';
      
      // Set animation properties
      heart.style.transition = 'transform 1s linear, opacity 0.2s linear 0.8s';
      
      // Create SVG
      heart.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path fill="${heartColor}" d="${heartPath}"></path>
        </svg>
      `;
      
      document.body.appendChild(heart);
      
      // Trigger animation after a small delay
      setTimeout(() => {
        heart.style.transform = `translate(${endX}px, ${endY}px) scale(1)`;
        heart.style.opacity = '0';
      }, 10);
      
      // Clean up the heart after animation completes
      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
          heartElements = heartElements.filter(el => el !== heart);
        }
      }, 1100);
    }
  }
  
  // Add event handlers to all badges
  function initBadgeHandlers() {
    // Get all badges
    const badges = document.querySelectorAll('.badge');
    
    // Add handlers to each badge
    badges.forEach(badge => {
      if (!badge._hasHeartConfetti) {
        badge._hasHeartConfetti = true;
        
        // Ensure the entire badge is clickable
        badge.style.position = 'relative';
        badge.style.cursor = 'pointer';
        
        // Remove any existing overlay
        const existingOverlay = badge.querySelector('.heart-overlay');
        if (existingOverlay) {
          badge.removeChild(existingOverlay);
        }
        
        // Create an overlay to capture clicks on the entire badge area
        const overlay = document.createElement('div');
        overlay.className = 'heart-overlay';
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '10'; 
        overlay.style.cursor = 'pointer';
        
        // Add the overlay to the badge
        badge.appendChild(overlay);
        
        // Add event handlers to the overlay
        overlay.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          createHearts(e);
        });
        
        overlay.addEventListener('touchend', function(e) {
          e.preventDefault();
          e.stopPropagation();
          createHearts(e);
        });
      }
    });
  }
  
  // Run on page load
  document.addEventListener('DOMContentLoaded', initBadgeHandlers);
  
  // Also check periodically for newly added badges
  setInterval(initBadgeHandlers, 2000);
  
  // Initialize if the DOM is already loaded
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initBadgeHandlers();
  }
})();