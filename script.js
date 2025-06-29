// DOM Elements
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherCard = document.getElementById('weather-card');
const forecastSection = document.getElementById('forecast-section');
const forecastContainer = document.getElementById('forecast-container');
const errorMessage = document.getElementById('error-message');

// API Details
const apiKey = "8951805e7b1d2bfd2b9afbba4e20dec7";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast";

// Search event listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchAllWeatherData(city);
    } else {
        showError("ကျေးဇူးပြု၍ မြို့အမည်တစ်ခု ထည့်ပေးပါ။");
    }
});

cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});

// Main function to fetch both current weather and forecast
async function fetchAllWeatherData(city) {
    // Construct URLs for both API calls
    const currentWeatherUrl = `${weatherApiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=my`;
    const forecastUrl = `${forecastApiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=my`;

    try {
        // Fetch both APIs at the same time for efficiency
        const [currentWeatherResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);

        if (!currentWeatherResponse.ok || !forecastResponse.ok) {
            throw new Error("မြို့အမည်ကို ရှာမတွေ့ပါ သို့မဟုတ် မှားယွင်းနေပါသည်။");
        }

        const currentWeatherData = await currentWeatherResponse.json();
        const forecastData = await forecastResponse.json();
        
        hideError();
        displayCurrentWeather(currentWeatherData);
        displayForecast(forecastData);

    } catch (error) {
        console.error("Error fetching data:", error);
        showError(error.message);
    }
}

// Function to display current weather
function displayCurrentWeather(data) {
    // Weather Info Elements
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed;
    document.getElementById('pressure').textContent = data.main.pressure;

    // Set weather icon
    const iconCode = data.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Format and display sunrise and sunset times
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    document.getElementById('sunrise-time').textContent = sunriseTime;
    document.getElementById('sunset-time').textContent = sunsetTime;

    // Show the weather card
    weatherCard.classList.remove('d-none');
}

// Function to display 5-day forecast
function displayForecast(data) {
    // Clear previous forecast
    forecastContainer.innerHTML = '';

    // The API provides data every 3 hours. We need to filter it to get one forecast per day.
    // A simple way is to get the forecast for the same time each day (e.g., 12:00 PM).
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyForecasts.forEach(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        
        // Format the day of the week in Burmese
        const dayOfWeek = forecastDate.toLocaleDateString('my-MM', { weekday: 'long' });
        
        const iconCode = forecast.weather[0].icon;
        const temp = `${Math.round(forecast.main.temp)}°C`;
        const description = forecast.weather[0].description;
        
        // Create forecast card HTML
        const forecastCardHtml = `
            <div class="col">
                <div class="forecast-card">
                    <p class="forecast-day">${dayOfWeek}</p>
                    <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${description}" class="forecast-icon">
                    <p class="forecast-temp">${temp}</p>
                    <p class="text-muted small">${description}</p>
                </div>
            </div>
        `;
        
        // Add the card to the container
        forecastContainer.insertAdjacentHTML('beforeend', forecastCardHtml);
    });

    // Show the forecast section
    forecastSection.classList.remove('d-none');
}


// Function to show an error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
    // Hide both weather card and forecast on error
    weatherCard.classList.add('d-none');
    forecastSection.classList.add('d-none');
}

// Function to hide the error message
function hideError() {
    errorMessage.classList.add('d-none');
}