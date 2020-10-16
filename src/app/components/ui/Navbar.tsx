import React from 'react';

const Navbar = (): JSX.Element => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">Beto R.</span>
      <button type="button" className="btn btn-outline-danger">
        <span>exit</span>
      </button>
    </div>
  );
};

export default Navbar;
