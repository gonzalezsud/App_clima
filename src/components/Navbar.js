import React from 'react';

function Navbar({ title }) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <h1 className="navbar-brand mx-auto">{title}</h1>
      </div>
    </nav>
  );
}

export default Navbar;
