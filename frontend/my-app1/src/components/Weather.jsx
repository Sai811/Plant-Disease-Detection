import React, { useState } from 'react';
import Navbar from './navbar';
import './weather.css';

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = 'a704719129e80744e077682950240d8e'; // Replace with your OpenWeatherMap API key

  // Function to fetch weather data
  const fetchWeather = async (e) => {
    e.preventDefault();
    
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data); // Set weather data if response is successful
        setError(null); // Clear any previous errors
      } else if (data.cod === "404") {
        setWeatherData(null); // Clear weather data if city not found
        setError("City not found. Please enter a valid city name.");
      } else {
        setWeatherData(null);
        setError("An error occurred: " + data.message);
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Weather Information</h1>
        {/* Input form to get city name */}
        <form onSubmit={fetchWeather}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter city name (e.g., Pune, Mumbai)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              pattern="[A-Za-z\s]+" // Accepts only letters and spaces
              title="Please enter a valid city name"
            />
          </div>
          <button type="submit" className="button">Get Weather</button>
        </form>

        {/* Display error if there is an error */}
        {error && <p className="alert alert-danger">{error}</p>}

        {/* Display weather data if available */}
        {weatherData && (
          <div className="weather-details mt-4">
            <h2>{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Condition: {weatherData.weather[0].description}</p>
            <div className="weather-icon">
              <img 
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                alt="Weather Icon" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
