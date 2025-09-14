// DOM elements
const poemsContainer = document.getElementById('poems-container');
const poemModal = document.getElementById('poem-modal');
const fullPoemElement = document.getElementById('full-poem');
const closeModalBtn = document.getElementById('close-modal');
const searchInput = document.getElementById('search');

let poemsData = [];

// Fetch poems from JSON file
fetch('poems.json')
    .then(response => response.json())
    .then(data => {
        poemsData = data.poems;
        displayPoems(poemsData);
    })
    .catch(error => {
        console.error('Error loading poems:', error);
        poemsContainer.innerHTML = '<p>ကဗျာများကို ဖတ်ရှုရန် ပြဿနာရှိနေပါသည်။</p>';
    });

// Display poems
function displayPoems(poems) {
    poemsContainer.innerHTML = '';
    
    poems.forEach(poem => {
        const poemCard = document.createElement('div');
        poemCard.className = 'poem-card';
        
        poemCard.innerHTML = `
            <div class="poem-header">
                <h3 class="poem-title">${poem.title}</h3>
                <p class="poem-author">${poem.author}</p>
            </div>
            <div class="poem-content">${poem.content}</div>
            <a class="view-more" data-id="${poem.id}">ဆက်ဖတ်ရန်</a>
        `;
        
        poemsContainer.appendChild(poemCard);
    });
    
    // Add event listeners to "View More" buttons
    document.querySelectorAll('.view-more').forEach(button => {
        button.addEventListener('click', function() {
            const poemId = parseInt(this.getAttribute('data-id'));
            showFullPoem(poemId);
        });
    });
}

// Show full poem in modal
function showFullPoem(poemId) {
    const poem = poemsData.find(p => p.id === poemId);
    if (poem) {
        fullPoemElement.textContent = poem.content;
        poemModal.style.display = 'block';
    }
}

// Close modal
closeModalBtn.addEventListener('click', function() {
    poemModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === poemModal) {
        poemModal.style.display = 'none';
    }
});

// Search functionality
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredPoems = poemsData.filter(poem => 
        poem.title.toLowerCase().includes(searchTerm) || 
        poem.author.toLowerCase().includes(searchTerm) ||
        poem.content.toLowerCase().includes(searchTerm)
    );
    displayPoems(filteredPoems);
});
