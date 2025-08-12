const API_KEY = "YOUR_OPENWEATHER_API-KEY"; 
let units = "metric";

const qInput = document.getElementById("q");
const searchBtn = document.getElementById("searchBtn");
const geoBtn = document.getElementById("geoBtn");

searchBtn.addEventListener("click", () => {
  if (qInput.value.trim()) {
    fetchWeather(qInput.value.trim());
  }
});

geoBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(pos => {
    fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
  });
});

function fetchWeather(query) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=${units}`)
    .then(r => r.json())
    .then(data => updateMainWeather(data));
}

function fetchWeatherByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`)
    .then(r => r.json())
    .then(data => updateMainWeather(data));
}

function updateMainWeather(data) {
  document.getElementById("temp").textContent = Math.round(data.main.temp) + "°";
  document.getElementById("desc").textContent = data.weather[0].description;
  document.getElementById("place").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("wind").textContent = data.wind.speed;
  document.getElementById("feels").textContent = Math.round(data.main.feels_like);
  document.getElementById("pressure").textContent = data.main.pressure;

  
  const isNight = data.weather[0].icon.includes("n");
  document.getElementById("night-filter").style.display = isNight ? "block" : "none";
}


function createRain() {
  const container = document.getElementById("rain-container");
  container.innerHTML = "";
  for (let i = 0; i < 80; i++) {
    const drop = document.createElement("div");
    drop.className = "drop";
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = 0.5 + Math.random() * 0.5 + "s";
    drop.style.opacity = 0.05 + Math.random() * 0.1;
    container.appendChild(drop);
  }
}


createRain();
