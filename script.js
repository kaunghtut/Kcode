// Load poems from poems.json and create a slide show
async function loadPoems() {
  const container = document.querySelector('.slides-container');
  const dotsContainer = document.querySelector('.dots-container');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const randomBtn = document.getElementById('randomBtn');

  // Show loading state
  container.innerHTML = `<div class="slide"><p>Loading poems...</p></div>`;

  try {
    const response = await fetch('poems.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}: File not found`);
    const poems = await response.json();

    // Validate data
    if (!Array.isArray(poems) || poems.length === 0) {
      throw new Error("No poems found in data");
    }

    // Clear and populate slides
    container.innerHTML = '';
    dotsContainer.innerHTML = '';

    poems.forEach((poem, index) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.innerHTML = `
        <div class="title">${poem.title}</div>
        <div class="author">— ${poem.author}</div>
        <div class="year">${poem.year}</div>
        <p>${poem.content}</p>
      `;
      container.appendChild(slide);

      // Create dot indicator
      const dot = document.createElement('span');
      dot.className = 'dot';
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    // Initialize slider
    let currentSlide = 0;
    const totalSlides = poems.length;

    // Function to show specific slide
    function showSlide(index) {
      container.style.transform = `translateX(-${index * 100}%)`;
      document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      currentSlide = index;
    }

    // Auto-slide every 5 seconds
    let autoSlideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }, 5000);

    // Previous button
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
      resetAutoSlide();
    });

    // Next button
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
      resetAutoSlide();
    });

    // Random button
    randomBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * totalSlides);
      showSlide(randomIndex);
      resetAutoSlide();
    });

    // Reset auto-slide timer when user interacts
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
      }, 5000);
    }

    // Start with first slide
    showSlide(0);

  } catch (error) {
    console.error("Error loading poems:", error);
    container.innerHTML = `
      <div class="slide" style="color: red; font-weight: bold;">
        ❌ Error loading poems<br>
        <small>${error.message}</small>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', loadPoems);
