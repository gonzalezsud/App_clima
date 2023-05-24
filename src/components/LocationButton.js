import React from 'react';

function LocationButton({ handleLocationClick }) {
  return (
    <button className="btn btn-primary mb-4" onClick={handleLocationClick}>
      Obtener pronóstico por ubicación
    </button>
  );
}

export default LocationButton;
