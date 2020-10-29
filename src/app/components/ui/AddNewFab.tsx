import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from 'src/app/store/storeModel';
import { AppClickEvent } from 'src/typings/htmlEvents';
import { openModal } from '../../reducers/uiActions';
import './AddNewFab.scss';

const mapDispatchToProps = {
  openModal,
};
type DispatchPropsType = typeof mapDispatchToProps;
type PropsType = DispatchPropsType;
const AddNewFab = ({ openModal: dispatchOpenModal }: PropsType) => {
  const handleButtonClick = (e: AppClickEvent) => {
    dispatchOpenModal();
  };
  return (
    <button
      type="button"
      className="btn btn-primary fab"
      onClick={handleButtonClick}
    >
      <FontAwesomeIcon icon={faPlus} size="2x" />
    </button>
  );
};

export default connect<null, DispatchPropsType, any, IStoreState>(
  null,
  mapDispatchToProps,
)(AddNewFab);
