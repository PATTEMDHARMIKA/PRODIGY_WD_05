// script.js
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const weatherInfoDiv = document.getElementById('weather-info');
const getWeatherBtn = document.getElementById('get-weather-btn');
const locationInput = document.getElementById('location-input');

getWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location');
    }
});

function fetchWeatherData(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found: ${location}`);
            }
            return response.json();
        })
        .then(data => displayWeatherData(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfoDiv.innerHTML = `<p>${error.message}. Please try again.</p>`;
        });
}

function displayWeatherData(data) {
    const { name, main, weather, wind } = data;
    weatherInfoDiv.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Feels like: ${main.feels_like}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind speed: ${wind.speed} m/s</p>
    `;
}
