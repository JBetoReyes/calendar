import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = (): JSX.Element => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">Beto R.</span>
      <button type="button" className="btn btn-outline-danger">
        <FontAwesomeIcon icon={faSignInAlt} /> <span>exit</span>
      </button>
    </div>
  );
};

export default Navbar;
