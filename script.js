
const apiKey = '88e85b9b7ab0162fe2bcf5def431fbbe'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('city-input');
const submitBtn = document.getElementById('submit-btn');
const weatherInfoDiv = document.getElementById('weather-info');


submitBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();

    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

function getWeather(city) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`; 

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}


function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const weatherHtml = `
        <h2>${cityName}</h2>
        <p><img src="${iconUrl}" alt="${description}"> <br>${description}</p>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        <p><strong>Pressure:</strong> ${pressure} hPa</p>
    `;

    weatherInfoDiv.innerHTML = weatherHtml;
}
