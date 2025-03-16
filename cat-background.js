// Interactive Cat background generator
document.addEventListener('DOMContentLoaded', function() {
  // Create a repeating pattern of cats
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
  
  // Track mouse position
  let mouseX = 0;
  let mouseY = 0;
  
  // Update mouse position on move
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateCats();
  });
  
  // Store all cat elements for easy access
  let cats = [];
  
  // Function to calculate distance between two points
  function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  
  // Function to calculate how many cats we need
  function createCats() {
    // Clear existing cats and array
    background.innerHTML = '';
    cats = [];
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate number of cats needed horizontally and vertically
    // We add a buffer to ensure coverage during scroll
    const catWidth = 20 * 1.13; // Based on CSS variables
    const catHeight = 20;
    
    const horizontalCats = Math.ceil(viewportWidth / (catWidth * 3)) + 2;
    const verticalCats = Math.ceil(viewportHeight / (catHeight * 3)) + 2;
    
    // Position cats in a grid pattern
    for (let y = 0; y < verticalCats; y++) {
      for (let x = 0; x < horizontalCats; x++) {
        const cat = document.createElement('div');
        cat.innerHTML = catTemplate;
        const catElement = cat.firstElementChild;
        
        // Position the cat
        const left = x * catWidth * 3;
        const top = y * catHeight * 3;
        catElement.style.left = `${left}px`;
        catElement.style.top = `${top}px`;
        
        // Store cat element and its position
        cats.push({
          element: catElement,
          x: left + (catWidth / 2), // Center point
          y: top + (catHeight / 2), // Center point
          eyeLeft: catElement.querySelector('.eye--left'),
          eyeRight: catElement.querySelector('.eye--right')
        });
        
        // Add random animation delays for default blinking
        const eyeElements = catElement.querySelectorAll('.eye');
        const pupilElements = catElement.querySelectorAll('.eye-pupil');
        
        eyeElements.forEach(eye => {
          eye.style.animationDelay = `${Math.random() * 4}s`;
        });
        
        pupilElements.forEach(pupil => {
          pupil.style.animationDelay = `${Math.random() * 4}s`;
        });
        
        background.appendChild(catElement);
      }
    }
  }
  
  // Function to update cats based on mouse proximity
  function updateCats() {
    // Define the proximity radius (3 cat width)
    const catWidth = 20 * 1.13;
    const proximityRadius = catWidth * 6;
    
    cats.forEach(cat => {
      // Calculate distance from mouse to cat
      const distance = getDistance(mouseX, mouseY, cat.x, cat.y);
      
      // If mouse is within proximity radius, close eyes
      if (distance <= proximityRadius) {
        // Add class to both eyes to override animation
        cat.eyeLeft.classList.add('eye--closed');
        cat.eyeRight.classList.add('eye--closed');
      } else {
        // Remove class to allow normal animation
        cat.eyeLeft.classList.remove('eye--closed');
        cat.eyeRight.classList.remove('eye--closed');
      }
    });
  }
  
  // Initial creation
  createCats();
  
  // Recreate on resize
  window.addEventListener('resize', function() {
    createCats();
    updateCats(); // Update after recreating
  });
});