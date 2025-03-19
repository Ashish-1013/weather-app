import React from "react";

const Weather = ({ data }) => {
  return (
    <div className="weather">
      <h2>{data.location.name}, {data.location.country}</h2>
      <p>{data.current.condition.text}</p>
      <p>Temperature: {data.current.temp_c}°C</p>
      <p>Humidity: {data.current.humidity}%</p>
      <p>Wind Speed: {data.current.wind_kph} km/h</p>
      <img src={data.current.condition.icon} alt="Weather Icon" />
    </div>
  );
};

export default Weather;