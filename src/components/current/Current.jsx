import React from 'react'
import { useSelector } from 'react-redux'


import './current.scss';

export default function Current() {
  const weatherCurrent = useSelector((state) => state.weather.weatherCurrent);
  const weatherMain = useSelector((state) => state.weather.main);
  const weatherWind = useSelector((state) => state.weather.wind);
  const city = useSelector((state) => state.weather.cityName);
  const currentState = useSelector((state) => state.weather.currentState);

  return (
    <div className={currentState ? "current-weather" : "current-weather-none"}>
      <div className="current-info">
        <img src="https://openweathermap.org/img/wn/04d.png" alt="Current weather logo" />
        <ul>
          <li>{Math.round(weatherMain.temp).toString().slice(0, 2)} <span>°C</span></li>
          <li>Humidity: {weatherMain.humidity}%</li>
          <li>Wind: {Math.round(weatherWind.speed * 3.6)} km/h</li>
        </ul>
      </div>
      <div className="current-other-info">
        <ul>
          <li><span className="other-info-city">{city}</span></li>
          <li><span className="other-info-clouds">{weatherCurrent.description}</span></li>
        </ul>
      </div>
    </div>
  )
}
