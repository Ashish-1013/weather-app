import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./COMPONENTS/Weather";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [background, setBackground] = useState("default");
  const [theme, setTheme] = useState("light");

  const API_KEY = "3e777d396e8548828f470423251903"; // Replace with your WeatherAPI key
  const API_URL = `https://api.weatherapi.com/v1/current.json`;

  const fetchWeather = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          key: API_KEY,
        },
      });
      setWeatherData(response.data);
      setError("");
      updateBackground(response.data.current.condition.text);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
      setBackground("default");
    }
  };

  const updateBackground = (weatherCondition) => {
    const condition = weatherCondition.toLowerCase();
    if (condition.includes("sunny") || condition.includes("clear")) {
      setBackground("sunny");
    } else if (condition.includes("cloudy") || condition.includes("overcast")) {
      setBackground("cloudy");
    } else if (condition.includes("rain") || condition.includes("drizzle")) {
      setBackground("rainy");
    } else if (condition.includes("snow") || condition.includes("blizzard")) {
      setBackground("snowy");
    } else {
      setBackground("default");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`app ${background} ${theme}`}>
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={toggleTheme} className="theme-toggle">
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      {error && <p className="error">{error}</p>}
      {weatherData && <Weather data={weatherData} />}
    </div>
  );
};

export default App;