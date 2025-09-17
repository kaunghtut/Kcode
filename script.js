// Fetch poems from JSON and render them
async function loadPoems() {
    try {
        const response = await fetch('poems.json');
        const poemsData = await response.json();
        const container = document.getElementById('poems-container');

        poemsData.forEach(item => {
            if (item.type === 'poem') {
                const element = document.createElement('div');
                element.className = 'piece';

                const title = document.createElement('h2');
                title.className = 'piece-title';
                title.textContent = item.title;

                const author = document.createElement('span');
                author.className = 'piece-author';
                author.textContent = `— ${item.author}`;

                const content = document.createElement('div');
                content.className = 'piece-content';
                content.textContent = item.content;

                element.appendChild(title);
                element.appendChild(author);
                element.appendChild(content);

                container.appendChild(element);
            }
        });

        // Start observing for scroll animations
        setupScrollAnimations();
        setupScrollPrompt();

    } catch (error) {
        console.error("Failed to load poems:", error);
        document.getElementById('poems-container').innerHTML = '<p>Unable to load content. Please try again later.</p>';
    }
}

// Setup scroll-triggered animations
function setupScrollAnimations() {
    function revealOnScroll() {
        const pieces = document.querySelectorAll('.piece');
        const windowHeight = window.innerHeight;

        pieces.forEach(piece => {
            const pieceTop = piece.getBoundingClientRect().top;
            if (pieceTop < windowHeight * 0.85) {
                piece.classList.add('visible');
            }
        });
    }

    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);
}

// Hide scroll prompt after first scroll
function setupScrollPrompt() {
    window.addEventListener('scroll', function() {
        const prompt = document.querySelector('.scroll-prompt');
        if (window.scrollY > 100 && prompt) {
            prompt.style.display = 'none';
        }
    }, { once: true });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', loadPoems);
