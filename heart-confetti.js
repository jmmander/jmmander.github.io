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
    // Get badge element and position
    const badge = event.currentTarget;
    const rect = badge.getBoundingClientRect();
    const badgeCenterX = rect.left + rect.width / 2;
    const badgeCenterY = rect.top + rect.height / 2;
    
    // Get color from badge class
    let heartColor = 'rgb(240, 168, 209)'; // Default color (pinkShadeC)
    
    // Determine which badge type was clicked
    Object.keys(badgeColors).forEach(className => {
      if (badge.classList.contains(className)) {
        heartColor = badgeColors[className];
      }
    });
    
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
      
      // Calculate end positions
      const endX = badgeCenterX + Math.cos(angle) * distance;
      const endY = badgeCenterY + Math.sin(angle) * distance;
      
      // Create heart element
      const heart = document.createElement('div');
      heartElements.push(heart);
      heart.style.position = 'fixed';
      heart.style.zIndex = '9999';
      heart.style.pointerEvents = 'none';
      heart.style.top = '0';
      heart.style.left = '0';
      heart.style.transform = `translate(${badgeCenterX}px, ${badgeCenterY}px) scale(0)`;
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
    console.log('Found', badges.length, 'badges');
    
    // Add handlers to each badge
    badges.forEach(badge => {
      if (!badge._hasHeartConfetti) {
        badge._hasHeartConfetti = true;
        
        // Ensure the entire badge is clickable
        badge.style.position = 'relative';
        badge.style.cursor = 'pointer';
        
        // Create an overlay to capture clicks on the entire badge area
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '10'; // High enough to be on top but below other important elements
        overlay.style.cursor = 'pointer';
        
        // Add the overlay to the badge
        badge.appendChild(overlay);
        
        // Add event handlers to the overlay
        overlay.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          // Pass the parent badge as the currentTarget
          const syntheticEvent = { currentTarget: badge };
          createHearts(syntheticEvent);
        });
        
        overlay.addEventListener('touchend', function(e) {
          e.preventDefault();
          e.stopPropagation();
          // Pass the parent badge as the currentTarget
          const syntheticEvent = { currentTarget: badge };
          createHearts(syntheticEvent);
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