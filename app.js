document.addEventListener('DOMContentLoaded', () => {
    // သင်၏ API Token ကို ဤနေရာတွင် ထည့်ပါ။
    const apiToken = '10835ef493294644912b9db33e06cdf5';

    // သင်၏ API Provider မှ ပေးထားသော Live Scores Endpoint URL ကို ဤနေရာတွင် ထည့်ပါ။
    // ဤ URL သည် ဥပမာတစ်ခုသာ ဖြစ်ပါသည်။
    const apiUrl = 'http://api.football-data.org/v4/teams/759/matches'; // Example URL

    // API သို့ Request ပြုလုပ်ရန် Function
    async function fetchLiveScores() {
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    // သင်၏ API Documentation အရ Authentication Header ကို ပြင်ဆင်ပါ။
                    // ဥပမာ: 'X-Auth-Token': apiToken
                    'Authorization': `Bearer ${apiToken}` // Example Authentication
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            displayScores(data.matches); // API response structure ပေါ်မူတည်၍ 'data.matches' ကို ပြင်ဆင်ပါ။
        } catch (error) {
            console.error("Error fetching live scores:", error);
            const scoresContainer = document.getElementById('scores-container');
            scoresContainer.innerHTML = '<p>Error loading scores. Please try again later.</p>';
        }
    }

    // ရရှိလာသော Data များကို HTML တွင် ဖော်ပြရန် Function
    function displayScores(matches) {
        const scoresContainer = document.getElementById('scores-container');
        scoresContainer.innerHTML = ''; // Clear previous content

        if (!matches || matches.length === 0) {
            scoresContainer.innerHTML = '<p>No live matches at the moment.</p>';
            return;
        }

        matches.forEach(match => {
            const matchElement = document.createElement('div');
            matchElement.classList.add('match');

            // API response structure ပေါ်မူတည်၍ အောက်ပါ key များကို ပြင်ဆင်ပါ။
            const homeTeam = match.homeTeam.name;
            const awayTeam = match.awayTeam.name;
            const homeScore = match.score.fullTime.homeTeam ?? '-';
            const awayScore = match.score.fullTime.awayTeam ?? '-';
            const matchStatus = match.status;

            matchElement.innerHTML = `
                <div class="team">${homeTeam}</div>
                <div class="score">${homeScore} - ${awayScore}</div>
                <div class="team">${awayTeam}</div>
                <div class="status">${matchStatus}</div>
            `;

            scoresContainer.appendChild(matchElement);
        });
    }

    // စတင်ပြီးနောက် ပထမအကြိမ် Data ရယူရန်
    fetchLiveScores();

    // စက္ကန့် ၆၀ တိုင်း Data ကို အသစ်ပြန်လည် ရယူရန် (မိနစ်တိုင်း update လုပ်ရန်)
    setInterval(fetchLiveScores, 60000);
});
