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
            const lines = poem.title.split('\n');
            const lines = poem.content.split('\n');
            const previewContent = lines.slice(0, PREVIEW_LINES).join('\n');
            const isTruncated = lines.length > PREVIEW_LINES;

            const previewText = document.createElement('div');
            previewText.className = 'preview-text';
            previewText.textContent = previewContent;

            block.appendChild(previewText);

            // Only add "Read More" if content is truncated
            if (isTruncated) {
                const readMoreBtn = document.createElement('button');
                readMoreBtn.className = 'read-more-btn';
                readMoreBtn.textContent = 'Read More';

                readMoreBtn.addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = poem.title; // 👈 Set the title
    modalFullText.textContent = poem.content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
});

                block.appendChild(readMoreBtn);
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



