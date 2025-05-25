document.addEventListener("DOMContentLoaded", function () {
  const apiKey = //put ur api key;
  const latitude = //ur desired latitude;
  const longitude = //ur desired longitude;

  // Select buttons and main window
  const fButton = document.querySelector(".unit.f"); // F° = minimize
  const cButton = document.querySelector(".unit.c"); // C = close
  const appWindow = document.querySelector(".frame1");

  if (fButton) {
    fButton.addEventListener("click", () => {
      appWindow.classList.add("shrink-out");
      setTimeout(() => {
        window.electronAPI?.minimizeWindow();
      }, 200);
    });
  }

  if (cButton) {
    cButton.addEventListener("click", () => {
      appWindow.classList.add("shrink-out");
      setTimeout(() => {
        window.electronAPI?.closeWindow();
      }, 200);
    });
  }

  // Fetch weather data from OpenWeatherMap
  async function fetchWeatherData(lat, lon) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();

      if (!data || !data.weather || !data.main) {
        console.error("No valid weather data returned.");
        alert("Failed to fetch weather details.");
        return;
      }

      const locationName = data.name;
      const temperature = data.main.temp;
      const weatherCondition = data.weather[0].description;
      const currentTime = new Date(data.dt * 1000);
      const isDay = data.dt > data.sys.sunrise && data.dt < data.sys.sunset;

      const weatherData = {
        locationName,
        currentTime: currentTime.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        }),
        temperature: Math.round(temperature),
        isDay,
        weatherCondition: `It’s ${weatherCondition}`,
      };

      updateWeatherUI(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data.");
    }
  }

  // Update UI with fetched weather data
  function updateWeatherUI(data) {
    const locationElement = document.getElementById("location");
    const conditionElement = document.getElementById("condition");
    const temperatureElement = document.getElementById("temperature");
    const timeElement = document.getElementById("time");

    if (locationElement) {
      locationElement.innerText = data.locationName;
    }

    if (temperatureElement) {
      temperatureElement.innerText = `${data.temperature}°`;
    }

    if (conditionElement) {
      conditionElement.innerText = data.weatherCondition;
    }

    if (timeElement) {
      timeElement.innerText = `${data.currentTime} (${data.isDay ? "Day" : "Night"})`;
    }
    const background = document.getElementById("background");
    
    if (background) {
      background.style.backgroundImage = data.isDay
      ? "url('assets/light.png')"
      : "url('assets/dark.png')";
    }

  }

  // Start weather fetch
  fetchWeatherData(latitude, longitude);

  window.electronAPI?.onWindowRestored?.(() => {
  const appWindow = document.querySelector(".frame1");
  appWindow?.classList.remove("shrink-out");

  // Optional: force layout repaint if GIF disappears
  appWindow.style.display = "none";
  void appWindow.offsetWidth;
  appWindow.style.display = "";
});

});
