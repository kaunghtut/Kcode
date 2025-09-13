const apiUrl = 'https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1/action/find'; // YOUR_APP_ID နဲ့ အစားထိုးပါ
const apiKey = 'NEIlqqxQvjNFvkKUkYxoCt2rKr71iOItLqRehvjv8p8UWQ75mddDUHdv0C2sKrMj'; // YOUR_API_KEY နဲ့ အစားထိုးပါ (production မှာ မသုံးပါနဲ့၊ proxy သုံးပါ)
const clusterName = 'Cluster0'; // သင့် cluster name နဲ့ အစားထိုးပါ

fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
    },
    body: JSON.stringify({
        dataSource: clusterName,
        database: 'poemdb',
        collection: 'poems',
        limit: 50 // အများဆုံး poems ၅၀ ပဲ fetch လုပ်မယ်
    })
})
.then(response => response.json())
.then(data => {
    const poems = data.documents;
    const poemList = document.getElementById('poem-list');
    poems.forEach(poem => {
        const div = document.createElement('div');
        div.className = 'poem';
        div.innerHTML = `
            <h2>${poem.title}</h2>
            <p>${poem.content}</p>
            <div class="author">ရေးသားသူ: ${poem.author}</div>
        `;
        poemList.appendChild(div);
    });
})
.catch(error => console.error('Error fetching poems:', error));