import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './AddNewFab.scss';

const AddNewFab = () => {
  return (
    <button type="button" className="btn btn-primary fab">
      <FontAwesomeIcon icon={faPlus} size="2x" />
    </button>
  );
};

export default AddNewFab;
