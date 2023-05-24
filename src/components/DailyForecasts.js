import React from 'react';

function DailyForecasts({ forecasts, convertTemperature, getDayFromDate, getWeatherIconUrl }) {
  return (
    <div className="card bg-primary text-white mb-4">
      <div className="card-body">
        <h2 className="card-title">Pronósticos por día</h2>
        <div className="row">
          {forecasts.map((item) => (
            <div className="col-md-4" key={item.item.dt}>
              <div className="card bg-light mb-4">
                <div className="card-body">
                  <p className="card-text">{getDayFromDate(item.date)}</p>
                  <p>
                    <img src={getWeatherIconUrl(item.item.weather[0].icon)} alt={item.item.weather[0].description} className="img-fluid" />
                  </p>
                  <p className="card-text">Máx: {convertTemperature(item.item.main.temp_max)}</p>
                  <p className="card-text">Mín: {convertTemperature(item.item.main.temp_min)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DailyForecasts;
