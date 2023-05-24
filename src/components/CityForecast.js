import React from 'react';

function CityForecast({
  city,
  date,
  temperature,
  iconUrl,
  description,
  temperatureUnitLabel,
  toggleTemperatureUnit
}) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">{city}</h2>
        <div>
          <p>{date}</p>
          <p>Temperatura: {temperature}</p>
          <p>
            <img src={iconUrl} alt={description} className="img-fluid" />
          </p>
          <p>Clima: {description}</p>
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={toggleTemperatureUnit}>
              Cambiar a {temperatureUnitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityForecast;
