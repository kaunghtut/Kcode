// ==============================================================================
// *** အရေးကြီး *** : သင့်ရဲ့ OpenWeatherMap API Key ကို ဒီနေရာမှာ ထည့်ပါ။  ***
// OpenWeatherMap Website (https://openweathermap.org/) မှာ အကောင့်ဖွင့်ပြီး
// API Key (ဥပမာ: 'abcdef1234567890abcdef1234567890') ကိုရယူပါ။
// ==============================================================================
const apiKey = '8951805e7b1d2bfd2b9afbba4e20dec7'; // <--- API KEY ကို ဒီမှာထည့်ပါ

const currentWeatherDataDiv = document.getElementById('current-weather-info');
const forecastInfoDiv = document.getElementById('forecast-info');
const cityButtons = document.querySelectorAll('.city');

cityButtons.forEach(button => {
    button.addEventListener('click', () => {
        const cityEnglishName = button.getAttribute('data-city-en');
        const cityMyanmarName = button.getAttribute('data-city-my');
        getWeatherData(cityEnglishName, cityMyanmarName);
    });
});

function displayError(element, message) {
    element.innerHTML = `<p class="error-message">${message}</p>`;
    console.error("Weather App Error:", message); // Log error to console for more details
}

async function getWeatherData(cityEnglishName, cityMyanmarName) {
    if (!apiKey || apiKey === 'YOUR_OPENWEATHERMAP_API_KEY' || apiKey.trim() === "") {
        displayError(currentWeatherDataDiv, 'API Key လိုအပ်ပါသည်။ ကျေးဇူးပြု၍ API Key ကို script.js ဖိုင်ထဲတွင် မှန်ကန်စွာ ထည့်သွင်းပါ။');
        forecastInfoDiv.innerHTML = '';
        return;
    }

    currentWeatherDataDiv.innerHTML = `<p class="loader">${cityMyanmarName} အတွက် လက်ရှိမိုးလေဝသအချက်အလက်များ ရယူနေပါသည်...</p>`;
    forecastInfoDiv.innerHTML = `<p class="loader">ခန့်မှန်းချက်များ ရယူနေပါသည်...</p>`;

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEnglishName},MM&appid=${apiKey}&units=metric&lang=my`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityEnglishName},MM&appid=${apiKey}&units=metric&lang=my`;

    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);

        // --- Process Current Weather ---
        if (!currentResponse.ok) {
            const errorData = await currentResponse.json().catch(() => ({ message: "Current weather data parsing failed." }));
            let errorMessage = `လက်ရှိအချက်အလက်ရယူရာတွင် ပြဿနာရှိပါသည် (Status: ${currentResponse.status})`;
            if (currentResponse.status === 401) errorMessage = 'API Key မှားနေသည် သို့မဟုတ် ခွင့်ပြုချက်မရှိပါ။ (Current Weather)';
            else if (currentResponse.status === 404) errorMessage = `${cityMyanmarName} မြို့အတွက် လက်ရှိအချက်အလက် မတွေ့ပါ။`;
            else if (errorData.message) errorMessage = `Current Weather Error: ${errorData.message}`;
            displayError(currentWeatherDataDiv, errorMessage); // Display error but continue to try forecast
        } else {
            const currentData = await currentResponse.json();
            displayCurrentWeather(currentData, cityMyanmarName);
        }

        // --- Process Forecast ---
        if (!forecastResponse.ok) {
            const errorData = await forecastResponse.json().catch(() => ({ message: "Forecast data parsing failed." }));
            let errorMessage = `ခန့်မှန်းချက်ရယူရာတွင် ပြဿနာရှိပါသည် (Status: ${forecastResponse.status})`;
            if (forecastResponse.status === 401) errorMessage = 'API Key မှားနေသည် သို့မဟုတ် ခွင့်ပြုချက်မရှိပါ။ (Forecast)';
            else if (forecastResponse.status === 404) errorMessage = `${cityMyanmarName} မြို့အတွက် ခန့်မှန်းချက် မတွေ့ပါ။`;
            else if (errorData.message) errorMessage = `Forecast Error: ${errorData.message}`;
            displayError(forecastInfoDiv, errorMessage);
            return; // Stop if forecast API call itself failed
        }
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData, cityMyanmarName); // Pass cityMyanmarName for context in errors if needed

    } catch (error) { // General catch for network issues or unhandled promise rejections
        console.error('General Error fetching weather data:', error);
        displayError(currentWeatherDataDiv, `ယေဘူယျအမှားအယွင်း: ${error.message}`);
        displayError(forecastInfoDiv, 'ခန့်မှန်းချက် ရယူ၍မရပါ၊ network သို့မဟုတ် API ပြဿနာဖြစ်နိုင်ပါသည်။');
    }
}

function displayCurrentWeather(data, cityMyanmarName) {
    if (!data || !data.main || !data.weather || !data.weather[0]) {
        displayError(currentWeatherDataDiv, `${cityMyanmarName} အတွက် လက်ရှိမိုးလေဝသ အချက်အလက်ပုံစံမမှန်ပါ။`);
        return;
    }
    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const description = data.weather[0].description;
    const mainWeather = data.weather[0].main;
    const iconCode = data.weather[0].icon;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;
    const visibility = data.visibility / 1000;

    let rainInfo = '';
    if (data.rain && data.rain['1h']) {
        rainInfo = `<p><strong>မိုးရေချိန် (၁ နာရီ):</strong> ${data.rain['1h']} mm</p>`;
    } else if (data.rain && data.rain['3h']) {
        rainInfo = `<p><strong>မိုးရေချိန် (၃ နာရီ):</strong> ${data.rain['3h']} mm</p>`;
    }

    let snowInfo = '';
    if (data.snow && data.snow['1h']) {
        snowInfo = `<p><strong>နှင်းကျနှုန်း (၁ နာရီ):</strong> ${data.snow['1h']} mm</p>`;
    } else if (data.snow && data.snow['3h']) {
        snowInfo = `<p><strong>နှင်းကျနှုန်း (၃ နာရီ):</strong> ${data.snow['3h']} mm</p>`;
    }

    currentWeatherDataDiv.innerHTML = `
        <h3>${cityMyanmarName} <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}"></h3>
        <p><strong>လက်ရှိအခြေအနေ:</strong> ${description} (${mainWeather})</p>
        <p><strong>အပူချိန်:</strong> ${temperature.toFixed(1)}°C</p>
        <p><strong>ခံစားရသည့်အပူချိန်:</strong> ${feelsLike.toFixed(1)}°C</p>
        ${rainInfo}
        ${snowInfo}
        <p><strong>စိုထိုင်းဆ:</strong> ${humidity}%</p>
        <p><strong>လေတိုက်နှုန်း:</strong> ${windSpeed} m/s</p>
        <p><strong>မြင်နိုင်စွမ်း:</strong> ${visibility.toFixed(1)} km</p>
        <p><strong>လေဖိအား:</strong> ${pressure} hPa</p>
        <p><small>အချက်အလက်များကို OpenWeatherMap မှရယူပါသည်။</small></p>
    `;
}

function displayForecast(data, cityMyanmarName) {
    let forecastHTML = `<h3>${cityMyanmarName} - မိုးလေဝသခန့်မှန်းချက် (၅ ရက်)</h3>`;
    forecastHTML += '<div class="forecast-grid">';

    if (!data || !data.list || !Array.isArray(data.list) || data.list.length === 0) {
        forecastHTML += `<p>ရက်အလိုက် ခန့်မှန်းချက်များ မရရှိနိုင်သေးပါ သို့မဟုတ် API မှ ${cityMyanmarName} အတွက် အချက်အလက် ပြည့်စုံမှုမရှိပါ။</p>`;
    } else {
        const dailyEntries = {}; // To store one entry per day
        let daysCount = 0;

        for (const item of data.list) {
            if (daysCount >= 5) break; // Ensure we only process for 5 unique days

            const datePart = item.dt_txt.split(' ')[0];
            if (!dailyEntries[datePart]) { // If this date is new and we need more days
                dailyEntries[datePart] = item;
                daysCount++;

                const dayDate = new Date(item.dt_txt);
                let dayName = '';
                let dateString = '';

                try {
                    // Attempt to use 'my-MM' (Myanmar locale)
                    dayName = dayDate.toLocaleDateString('my-MM', { weekday: 'short' });
                    dateString = dayDate.toLocaleDateString('my-MM', { day: 'numeric', month: 'short' });
                } catch (e) {
                    console.warn("Myanmar locale 'my-MM' not fully supported for date formatting. Falling back.", e);
                    // Basic fallback if 'my-MM' is not supported or causes error
                    const dayNamesFallback = ["တနင်္ဂနွေ", "တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓဟူး", "ကြာသပတေး", "သောကြာ", "စနေ"];
                    const monthNamesFallback = ["ဇန်", "ဖေ", "မတ်", "ဧပြီ", "မေ", "ဇွန်", "ဇူ", "ဩ", "စက်", "အောက်", "နို", "ဒီ"];
                    dayName = dayNamesFallback[dayDate.getDay()];
                    dateString = `${dayDate.getDate()} ${monthNamesFallback[dayDate.getMonth()]}`;
                }

                const temp = item.main.temp;
                const icon = item.weather[0].icon;
                const desc = item.weather[0].description;

                forecastHTML += `
                    <div class="forecast-day">
                        <p class="date">${dayName}, ${dateString}</p>
                        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
                        <p><strong>${temp.toFixed(1)}°C</strong></p>
                        <p>${desc}</p>
                    </div>
                `;
            }
        }
        if (daysCount === 0) { // If loop completed but no days were processed (e.g. all items were for same day beyond first)
             forecastHTML += `<p>${cityMyanmarName} အတွက် ရက်အလိုက် ခန့်မှန်းချက်များ စီစစ်၍မရပါ။ API data ကိုစစ်ဆေးပါ။</p>`;
        }
    }

    forecastHTML += '</div>';
    forecastInfoDiv.innerHTML = forecastHTML;
}

// Initial placeholder messages
currentWeatherDataDiv.innerHTML = `<p style="text-align:center;">မြို့တစ်ခုကိုနှိပ်ပြီး လက်ရှိမိုးလေဝသအချက်အလက်များ ကြည့်ရှုနိုင်ပါသည်။</p>`;
forecastInfoDiv.innerHTML = `<p style="text-align:center;">ခန့်မှန်းချက်များအတွက် မြို့ရွေးချယ်ပါ။</p>`;