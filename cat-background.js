// Optimized Cat background generator
document.addEventListener('DOMContentLoaded', function() {
  // Performance optimization flags
  const isLowEndDevice = window.navigator.hardwareConcurrency <= 4;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Create background element reference
  const background = document.getElementById('cat-background');
  const catTemplate = `
    <div class="cat">
      <div class="ear ear--left"></div>
      <div class="ear ear--right"></div>
      <div class="face">
        <div class="eye eye--left">
          <div class="eye-pupil"></div>
        </div>
        <div class="eye eye--right">
          <div class="eye-pupil"></div>
        </div>
        <div class="muzzle"></div>
      </div>
    </div>
  `;
  
  // Track mouse position and movement state
  let mouseX = -1000; // Start off-screen so no cats animate initially
  let mouseY = -1000;
  let isMouseMoving = false;
  let mouseIdleTimer = null;
  let lastFrameTime = 0;
  let cats = [];
  let isFirstRender = true;
  
  // Constants to avoid recalculation
  const catWidth = 20 * 1.13; // Based on CSS variables
  const catHeight = 20;
  const proximityRadius = catWidth * 7; // Significantly increased proximity radius for easier testing
  
  // Update mouse position on move with throttling
  document.addEventListener('mousemove', function(e) {
    // Clear any existing idle timer
    if (mouseIdleTimer) {
      clearTimeout(mouseIdleTimer);
    }
    
    // Set moving state
    isMouseMoving = true;
    
    // Update position
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Force immediate update when mouse moves
    updateCats();
    
    // Set a timer to mark mouse as idle after 300ms
    mouseIdleTimer = setTimeout(function() {
      isMouseMoving = false;
      // Update once more when idle
      updateCats();
    }, 300);
  });
  
  // Function to calculate distance between two points
  function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  
  // Create cats more efficiently
  function createCats() {
    // Clear existing cats and array
    background.innerHTML = '';
    cats = [];
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate number of cats with adaptive density based on device capability
    let spacing = 3; // Default spacing
    if (isLowEndDevice || isMobile) {
      spacing = 5; // Much sparser grid on low-end devices
    } else if (viewportWidth * viewportHeight > 1920 * 1080) {
      spacing = 4; // Slightly sparser grid on high-res displays
    }
    
    // Calculate grid dimensions
    const horizontalCats = Math.ceil(viewportWidth / (catWidth * spacing)) + 1;
    const verticalCats = Math.ceil(viewportHeight / (catHeight * spacing)) + 1;
    
    // Create a document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Create cats with improved positioning
    for (let y = 0; y < verticalCats; y++) {
      for (let x = 0; x < horizontalCats; x++) {
        const cat = document.createElement('div');
        cat.innerHTML = catTemplate;
        const catElement = cat.firstElementChild;
        
        // Position with slight randomness to break the grid pattern
        const left = (x * catWidth * spacing) + (Math.random() * 10 - 5);
        const top = (y * catHeight * spacing) + (Math.random() * 10 - 5);
        catElement.style.left = `${left}px`;
        catElement.style.top = `${top}px`;
        
        // Store cat element and its position (store fewer properties)
        cats.push({
          element: catElement,
          x: left + (catWidth / 2), // Center point
          y: top + (catHeight / 2), // Center point
          eyeLeft: null, // Will be lazily evaluated when needed
          eyeRight: null,
          distance: Infinity // Initialize at a far distance
        });
        
        fragment.appendChild(catElement);
      }
    }
    
    // Append all cats at once for better performance
    background.appendChild(fragment);
    
    // Mark as first render
    isFirstRender = true;
  }
  
  // Function to update cats based on mouse proximity - optimized version
  function updateCats() {
    // Skip updates when off-page
    if (document.hidden) return;
    
    // Early exit if no movement and not first render
    if (!isMouseMoving && !isFirstRender) {
      return;
    }
    
    isFirstRender = false;
    
    // Debug info - log mouse position
    if (isFirstRender || isMouseMoving) {
      console.log(`Mouse position: ${mouseX}, ${mouseY}`);
      console.log(`Proximity radius: ${proximityRadius}px`);
    }
    
    // Process all cats at once for this simplified logic
    for (let i = 0; i < cats.length; i++) {
      const cat = cats[i];
      
      // Skip if cat is far outside the viewport (coarse culling)
      if (cat.x < -100 || cat.x > window.innerWidth + 100 || 
          cat.y < -100 || cat.y > window.innerHeight + 100) {
        continue;
      }
      
      // Calculate distance for all visible cats
      cat.distance = getDistance(mouseX, mouseY, cat.x, cat.y);
      
      // Debug first few cats
      if (i < 3) {
        console.log(`Cat ${i} position: ${cat.x}, ${cat.y}, distance: ${cat.distance}`);
      }
      
      // Lazy initialize references if needed
      if (!cat.eyeLeft) {
        cat.eyeLeft = cat.element.querySelector('.eye--left');
        cat.eyeRight = cat.element.querySelector('.eye--right');
        
        // Debug - make sure we found the eyes
        if (i < 3) {
          console.log(`Cat ${i} eye elements found: ${!!cat.eyeLeft}, ${!!cat.eyeRight}`);
        }
      }
      
      // Based on the distance, close or open eyes
      if (cat.distance <= proximityRadius) {
        // Close eyes when mouse is nearby
        cat.eyeLeft.classList.add('eye--closed');
        cat.eyeRight.classList.add('eye--closed');
        
        // Debug - log state change
        if (i < 3) {
          console.log(`Cat ${i} eyes closed`);
        }
      } else {
        // Open eyes when mouse is far
        cat.eyeLeft.classList.remove('eye--closed');
        cat.eyeRight.classList.remove('eye--closed');
      }
    }
  }
  
  // Initial creation - use requestIdleCallback if available
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      createCats();
      updateCats();
    });
  } else {
    // Fallback
    setTimeout(() => {
      createCats();
      updateCats();
    }, 100);
  }
  
  // Recreate on resize with debounce
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      createCats();
      updateCats();
    }, 250);
  });
  
  // Handle visibility changes to stop processing when tab isn't visible
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      // When becoming visible again, update once
      requestAnimationFrame(updateCats);
    }
  });
});