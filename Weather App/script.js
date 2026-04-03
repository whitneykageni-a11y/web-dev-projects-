const temp = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const condition = document.getElementById("condition");
let cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const conditionEmoji = document.getElementById("conditionEmoji");
async function getWeather() {
    let city = cityInput.value.trim();

    if (!city) {
        condition.textContent = "Enter a city";
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e818d67d9181848ea3071e56d7f1cf39&units=metric`;

    // Loading state
    condition.textContent = "Loading...";
    conditionEmoji.textContent = "⏳";

    try {
        const response = await fetch(url);
        let data = await response.json();

        if (data.cod !== 200) {
            condition.textContent = "City not found";
            conditionEmoji.textContent = "❌";

            temp.textContent = "";
            humidity.textContent = "";
            wind.textContent = "";
            return;
        }

        temp.textContent = `Temperature: ${data.main.temp}°C`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind: ${data.wind.speed}m/s`;

        let weatherMain = data.weather[0].main;
        condition.textContent = `Condition: ${weatherMain}`;

        // Emoji logic
        if (weatherMain === "Rain") {
            conditionEmoji.textContent = "🌧️";
        } else if (weatherMain === "Clear") {
            conditionEmoji.textContent = "☀️";
        } else if (weatherMain === "Clouds") {
            conditionEmoji.textContent = "☁️";
        } else {
            conditionEmoji.textContent = "⛅";
        }

    } catch (error) {
        condition.textContent = "Error fetching data";
        conditionEmoji.textContent = "⚠️";
    }
}

searchBtn.addEventListener("click", function() {
    getWeather();
});
cityInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getWeather();
    }
});