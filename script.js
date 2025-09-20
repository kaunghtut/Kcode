// DOM Elements
const container = document.getElementById('poems-container');
const modal = document.getElementById('modalOverlay');
const modalFullText = document.getElementById('modalFullText');
const closeModalBtn = document.querySelector('.modal-close');

// Number of lines to show in preview
const PREVIEW_LINES = 4;

// Load poems from JSON and render
fetch('poems.json')
    .then(response => response.json())
    .then(poems => {
        poems.forEach(poem => {
            const block = document.createElement('div');
            block.className = 'preview-block';
               // ✅ CREATE AND APPEND TITLE
    const titleElement = document.createElement('h3');
    titleElement.className = 'poem-title';
    titleElement.textContent = poem.title;
    block.appendChild(titleElement);
            
            const lines = poem.content.split('\n');
            const previewContent = lines.slice(0, PREVIEW_LINES).join('\n');
            const isTruncated = lines.length > PREVIEW_LINES;

            const previewText = document.createElement('div');
            previewText.className = 'preview-text';
            previewText.textContent = previewContent;

            block.appendChild(previewText);

            // Only add "Read More" if content is truncated
            if (isTruncated) {
    // Read More Button
    const readMoreBtn = document.createElement('button');
    readMoreBtn.className = 'read-more-btn';
    readMoreBtn.textContent = 'Read More';

    readMoreBtn.addEventListener('click', () => {
        document.getElementById('modalTitle').textContent = poem.title;
        modalFullText.textContent = poem.content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    block.appendChild(readMoreBtn);

    // === SHARE BUTTON ===
    const shareBtn = document.createElement('button');
    shareBtn.className = 'share-btn';
    shareBtn.title = `Share "${poem.title}" on Facebook`;
    shareBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
            <path d="M12 6v2"></path>
            <path d="M9 17l3-3 3 3"></path>
        </svg>
    `;

    // Generate Facebook Share URL
    const shareTitle = encodeURIComponent(poem.title);
    const shareText = encodeURIComponent(poem.content.split('\n')[0]); // First line
    const shareUrl = encodeURIComponent(window.location.href);
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareTitle}: ${shareText}`;

    shareBtn.addEventListener('click', () => {
        window.open(facebookShareUrl, 'Share on Facebook', 'width=600,height=400');
    });

    block.appendChild(shareBtn);
}

            container.appendChild(block);
        });
    })
    .catch(error => {
        console.error('Failed to load poems:', error);
        container.innerHTML = '<p>Unable to load content. Please try again later.</p>';
    });

// Close modal with × button
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Re-enable scroll
});

// Close modal if user clicks outside content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Optional: Close with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});





// =============
// THEME SYSTEM
// =============

const themeSelect = document.getElementById('theme-select');
const body = document.body;

function applyTheme(theme) {
    // Remove all theme classes
    body.classList.remove('theme-dark', 'theme-book', 'theme-blue-light');

    // Apply selected theme
    if (theme === 'dark') {
        body.classList.add('theme-dark');
    } else if (theme === 'book') {
        body.classList.add('theme-book');
    } else if (theme === 'blue-light') {
        body.classList.add('theme-blue-light');
    }
    // 'light' is default — no class needed

    // Save preference
    localStorage.setItem('lizzy-theme', theme);
}

// Load saved theme on startup
const savedTheme = localStorage.getItem('lizzy-theme');
if (savedTheme) {
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
}

// Listen for user changes
themeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
});

