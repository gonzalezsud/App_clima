import React from 'react';

function TodayHighlights({ iconUrl, description, maxTemperature, minTemperature, humidity }) {
  return (
    <div className="card bg-primary text-white mb-4">
      <div className="card-body">
        <h2 className="card-title">Lo más destacado de hoy</h2>
        <div className="row">
          <div className="col-md-3">
            <div className="card bg-light">
              <div className="card-body">
                <p className="card-text">
                  <img src={iconUrl} alt={description} className="img-fluid" />
                </p>
                <p className="card-text">{description}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-light">
              <div className="card-body">
                <p className="card-text">Temperatura Máx: {maxTemperature}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-light">
              <div className="card-body">
                <p className="card-text">Temperatura Mín: {minTemperature}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-light">
              <div className="card-body">
                <p className="card-text">Humedad: {humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayHighlights;
