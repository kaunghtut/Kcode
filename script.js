document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const poemDisplayArea = document.getElementById('poem-display-area');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const poemCounter = document.getElementById('poem-counter');

    // State variables
    let poems = [];
    let currentIndex = 0;

    // Function to display a poem based on the current index
    function displayPoem() {
        // Clear the previous poem
        poemDisplayArea.innerHTML = '';

        // Check if there are any poems
        if (poems.length === 0) {
            poemDisplayArea.innerHTML = '<p>ကဗျာများ မတွေ့ရှိပါ</p>';
            return;
        }

        const poem = poems[currentIndex];

        // --- Build the poem card (same logic as before) ---
        const poemCard = document.createElement('div');
        poemCard.classList.add('poem-card');

        const titleElement = document.createElement('h2');
        titleElement.classList.add('poem-title');
        titleElement.textContent = poem.title;

        const authorElement = document.createElement('h3');
        authorElement.classList.add('poem-author');
        authorElement.textContent = `~ ${poem.author}`;

        const poemLinesContainer = document.createElement('div');
        poemLinesContainer.classList.add('poem-lines-container');

        const linesElement = document.createElement('p');
        linesElement.classList.add('poem-lines');
        linesElement.textContent = poem.lines.join('\n');
        poemLinesContainer.appendChild(linesElement);

        const readMoreBtn = document.createElement('button');
        readMoreBtn.classList.add('read-more-btn');
        readMoreBtn.textContent = 'ဆက်ဖတ်မည်';
        readMoreBtn.addEventListener('click', () => {
            poemLinesContainer.classList.toggle('expanded');
            readMoreBtn.textContent = poemLinesContainer.classList.contains('expanded') ? 'ပြန်ခეცရန်' : 'ဆက်ဖတ်မည်';
        });

        poemCard.appendChild(titleElement);
        poemCard.appendChild(authorElement);
        poemCard.appendChild(poemLinesContainer);
        poemCard.appendChild(readMoreBtn);
        // --- End of poem card building ---

        // Append the new card to the display area
        poemDisplayArea.appendChild(poemCard);

        // Update the counter
        poemCounter.textContent = `${currentIndex + 1} / ${poems.length}`;
    }

    // Event Listeners for navigation buttons
    nextBtn.addEventListener('click', () => {
        // Move to the next index, loop back to 0 if at the end
        currentIndex = (currentIndex + 1) % poems.length;
        displayPoem();
    });

    prevBtn.addEventListener('click', () => {
        // Move to the previous index, loop to the end if at the beginning
        currentIndex = (currentIndex - 1 + poems.length) % poems.length;
        displayPoem();
    });

    // Fetch poems data and initialize the first poem
    fetch('poems.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            poems = data; // Store all poems in the array
            displayPoem(); // Display the first poem initially
        })
        .catch(error => {
            console.error('Error fetching poem data:', error);
            poemDisplayArea.innerHTML = '<p>ကဗျာများကို ဖတ်ရှုရာတွင် အမှားအယွင်း ဖြစ်ပေါ်နေပါသည်။</p>';
        });
});

