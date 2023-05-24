import React from 'react';

function SearchForm({ cityName, handleInputChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese el nombre de la ciudad"
          value={cityName}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" type="submit">
          Obtener pronóstico
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
