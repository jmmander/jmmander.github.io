// Cat background generator
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
  
  // Function to calculate how many cats we need
  function createCats() {
    // Clear existing cats
    background.innerHTML = '';
    
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
        catElement.style.left = `${x * catWidth * 3}px`;
        catElement.style.top = `${y * catHeight * 3}px`;
        
        // Add random animation delays
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
  
  // Initial creation
  createCats();
  
  // Recreate on resize
  window.addEventListener('resize', createCats);
});