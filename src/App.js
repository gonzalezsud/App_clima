import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';
import LocationButton from './components/LocationButton';
import CityForecast from './components/CityForecast';
import DailyForecasts from './components/DailyForecasts';
import TodayHighlights from './components/TodayHighlights';
import './App.css';

function App() {
  const [cityName, setCityName] = useState('');
  const [forecast, setForecast] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('metric'); // 'metric' para Celsius, 'imperial' para Fahrenheit

  const API_KEY = '97bdfe0f030f8999eeffa8d705695e4f';

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=es&units=${temperatureUnit}&appid=${API_KEY}`
      );
      setForecast(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocationClick = async () => {
    if (latitude && longitude) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=es&units=${temperatureUnit}&appid=${API_KEY}`
        );
        setForecast(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleTemperatureUnit = () => {
    const newUnit = temperatureUnit === 'metric' ? 'imperial' : 'metric';
    setTemperatureUnit(newUnit);
    if (forecast) {
      const convertedData = { ...forecast };
      convertedData.list.forEach((item) => {
        if (newUnit === 'metric') {
          item.main.temp = Math.round(((item.main.temp - 32) * 5) / 9);
          item.main.temp_max = Math.round(((item.main.temp_max - 32) * 5) / 9);
          item.main.temp_min = Math.round(((item.main.temp_min - 32) * 5) / 9);
        } else {
          item.main.temp = Math.round((item.main.temp * 9) / 5 + 32);
          item.main.temp_max = Math.round((item.main.temp_max * 9) / 5 + 32);
          item.main.temp_min = Math.round((item.main.temp_min * 9) / 5 + 32);
        }
      });
      setForecast(convertedData);
    }
  };

  const getTemperatureUnitLabel = () => {
    return temperatureUnit === 'metric' ? 'Celsius' : 'Fahrenheit';
  };

  const convertTemperature = (temp) => {
    return temperatureUnit === 'metric' ? `${temp}°C` : `${temp}°F`;
  };

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  const getDayFromDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
  };

  return (
    <div className="container mt-4">
      <Navbar title="Pronóstico del clima" />
      <div className="row">
        <div className="col-md-3">
          <SearchForm
            cityName={cityName}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="col-md-9">
          <LocationButton handleLocationClick={handleLocationClick} />
        </div>
      </div>
      {forecast && forecast.city && (
        <div className="row">
          <div className="col-md-3">
            <CityForecast
              city={forecast.city.name}
              date={new Date(forecast.list[0].dt_txt).toLocaleString()}
              temperature={convertTemperature(forecast.list[0].main.temp)}
              iconUrl={getWeatherIconUrl(forecast.list[0].weather[0].icon)}
              description={forecast.list[0].weather[0].description}
              temperatureUnitLabel={getTemperatureUnitLabel()}
              toggleTemperatureUnit={toggleTemperatureUnit}
            />
          </div>
          <div className="col-md-9">
            <DailyForecasts
              forecasts={forecast.list.reduce((acc, item) => {
                const date = item.dt_txt.split(' ')[0];
                const existingItem = acc.find((accItem) => accItem.date === date);
                if (!existingItem) {
                  acc.push({ date, item });
                }
                return acc;
              }, [])}
              convertTemperature={convertTemperature}
              getDayFromDate={getDayFromDate}
              getWeatherIconUrl={getWeatherIconUrl}
            />
            <TodayHighlights
              iconUrl={getWeatherIconUrl(forecast.list[0].weather[0].icon)}
              description={forecast.list[0].weather[0].description}
              maxTemperature={convertTemperature(forecast.list[0].main.temp_max)}
              minTemperature={convertTemperature(forecast.list[0].main.temp_min)}
              humidity={forecast.list[0].main.humidity}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
