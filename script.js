document.addEventListener('DOMContentLoaded', () => {
    const poemContainer = document.getElementById('poem-container');

    fetch('poems.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(poems => {
            poems.forEach(poem => {
                // Create the main card element
                const poemCard = document.createElement('div');
                poemCard.classList.add('poem-card');

                // Create title
                const titleElement = document.createElement('h2');
                titleElement.classList.add('poem-title');
                titleElement.textContent = poem.title;

                // Create author
                const authorElement = document.createElement('h3');
                authorElement.classList.add('poem-author');
                authorElement.textContent = `~ ${poem.author}`;

                // Create a container for the poem lines for collapsing effect
                const poemLinesContainer = document.createElement('div');
                poemLinesContainer.classList.add('poem-lines-container');

                // Create the paragraph for poem lines
                const linesElement = document.createElement('p');
                linesElement.classList.add('poem-lines');
                linesElement.textContent = poem.lines.join('\n');

                // Append lines to its container
                poemLinesContainer.appendChild(linesElement);

                // Create the "Read More" button
                const readMoreBtn = document.createElement('button');
                readMoreBtn.classList.add('read-more-btn');
                readMoreBtn.textContent = 'ဆက်ဖတ်မည်';
                
                // Add click event listener to the button
                readMoreBtn.addEventListener('click', () => {
                    // Toggle the 'expanded' class on the container
                    poemLinesContainer.classList.toggle('expanded');

                    // Change the button text based on the state
                    if (poemLinesContainer.classList.contains('expanded')) {
                        readMoreBtn.textContent = 'ပြန်ခეცရန်';
                    } else {
                        readMoreBtn.textContent = 'ဆက်ဖတ်မည်';
                    }
                });


                // Append all elements to the poem card
                poemCard.appendChild(titleElement);
                poemCard.appendChild(authorElement);
                poemCard.appendChild(poemLinesContainer);
                poemCard.appendChild(readMoreBtn);

                // Append the complete card to the main container
                poemContainer.appendChild(poemCard);
            });
        })
        .catch(error => {
            console.error('Error fetching poem data:', error);
            poemContainer.innerHTML = '<p>ကဗျာများကို ဖတ်ရှုရာတွင် အမှားအယွင်း ဖြစ်ပေါ်နေပါသည်။</p>';
        });
});
