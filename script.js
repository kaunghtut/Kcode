async function loadPoems() {
  try {
    const response = await fetch('poems.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const poems = await response.json();

    const authorFilter = document.getElementById('authorFilter');
    const uniqueAuthors = [...new Set(poems.map(p => p.author))];
    uniqueAuthors.forEach(author => {
      const option = document.createElement('option');
      option.value = author;
      option.textContent = author;
      authorFilter.appendChild(option);
    });

    displayPoem(poems[0]);

    authorFilter.addEventListener('change', () => {
      const selectedAuthor = authorFilter.value;
      const filtered = selectedAuthor
        ? poems.filter(p => p.author === selectedAuthor)
        : poems;
      displayPoem(filtered[0] || { title: "No poems found", author: "", content: "" });
    });

    document.getElementById('randomBtn').addEventListener('click', () => {
      const randomPoem = poems[Math.floor(Math.random() * poems.length)];
      displayPoem(randomPoem);
    });

  } catch (error) {
    document.getElementById('poemContainer').innerHTML = `
      <p style="color: red;">Error loading poems: ${error.message}</p>
      <p>Please ensure <code>poems.json</code> is in the same directory.</p>
    `;
  }
}

function displayPoem(poem) {
  const container = document.getElementById('poemContainer');
  if (!poem) return;

  container.innerHTML = `
    <div class="title">${poem.title}</div>
    <div class="author">— ${poem.author}</div>
    <div class="year">${poem.year}</div>
    <p>${poem.content}</p>
  `;
}

document.addEventListener('DOMContentLoaded', loadPoems);