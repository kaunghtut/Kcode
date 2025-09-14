document.addEventListener('DOMContentLoaded', () => {
    const poemContainer = document.getElementById('poem-container');

    // poems.json ဖိုင်ကို fetch လုပ်ပြီး data ယူခြင်း
    fetch('poems.json')
        .then(response => {
            // response က OK (status 200) ဖြစ်မဖြစ် စစ်ဆေးခြင်း
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // JSON data ကို parse လုပ်ခြင်း
        })
        .then(poems => {
            // ရလာတဲ့ poems array ကို loop ပတ်ပြီး HTML ထဲ ထည့်ခြင်း
            poems.forEach(poem => {
                // ကဗျာတစ်ပုဒ်ချင်းစီအတွက် card element ဆောက်ခြင်း
                const poemCard = document.createElement('div');
                poemCard.classList.add('poem-card');

                // ခေါင်းစဉ်အတွက် h2 element ဆောက်ခြင်း
                const titleElement = document.createElement('h2');
                titleElement.classList.add('poem-title');
                titleElement.textContent = poem.title;

                // ရေးသူအတွက် h3 element ဆောက်ခြင်း
                const authorElement = document.createElement('h3');
                authorElement.classList.add('poem-author');
                authorElement.textContent = `~ ${poem.author}`;

                // ကဗျာစာသားအတွက် p element ဆောက်ခြင်း
                const linesElement = document.createElement('p');
                linesElement.classList.add('poem-lines');
                // lines array ကို join('\n') နဲ့ စာကြောင်းအသစ်တွေနဲ့ ဆက်ပေးခြင်း
                linesElement.textContent = poem.lines.join('\n');

                // ဆောက်ထားတဲ့ element တွေကို poemCard ထဲ ထည့်ခြင်း
                poemCard.appendChild(titleElement);
                poemCard.appendChild(authorElement);
                poemCard.appendChild(linesElement);

                // ပြည့်စုံသွားတဲ့ poemCard ကို container ထဲ ထည့်ခြင်း
                poemContainer.appendChild(poemCard);
            });
        })
        .catch(error => {
            console.error('Error fetching poem data:', error);
            poemContainer.innerHTML = '<p>ကဗျာများကို ဖတ်ရှုရာတွင် အမှားအယွင်း ဖြစ်ပေါ်နေပါသည်။</p>';
        });
});