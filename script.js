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
    // Read More Button (unchanged)
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

    // === FACEBOOK SHARE BUTTON ===
    const fbShareBtn = document.createElement('button');
    fbShareBtn.className = 'fb-share-btn';
    fbShareBtn.title = `Share "${poem.title}" on Facebook`;

    // Create icon + text
    fbShareBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
        </svg>
        Share
    `;

    // Generate share text: Title + First 2 lines
    const lines = poem.content.split('\n');
    const previewLines = lines.slice(0, 2).join(' ').substring(0, 150); // Max 150 chars
    const shareText = `${poem.title}: ${previewLines}...`;

    const shareUrl = encodeURIComponent(window.location.href);
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodeURIComponent(shareText)}`;

fbShareBtn.addEventListener('click', () => {
    // Dynamically update Open Graph tags
    const ogTitle = document.getElementById('og-title');
    const ogDescription = document.getElementById('og-description');
    const ogUrl = document.getElementById('og-url');

    // Set dynamic OG tags
    ogTitle.textContent = poem.title;
    ogDescription.textContent = shareText; // Your custom preview text
    ogUrl.setAttribute('content', window.location.href);

    // Optional: Set a default image if you have one
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
        ogImage.setAttribute('content', 'https://yourdomain.com/images/lizzy-share.jpg'); // Replace with actual image URL
    }

    // Wait a tiny moment to ensure DOM updates, then open share dialog
    setTimeout(() => {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        window.open(facebookShareUrl, 'facebook-share-dialog', 'width=600,height=400');
    }, 100);
});

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



