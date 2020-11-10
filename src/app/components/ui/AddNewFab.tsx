import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {connect} from 'react-redux';
import {IStoreState} from 'src/app/store/storeModel';
import {AppClickEvent} from 'src/typings/htmlEvents';
import {openModal} from '../../reducers/uiActions';
import {setActiveEvent} from '../../reducers/calendarActions';
import './AddNewFab.scss';

const mapDispatchToProps = {
  openModal,
  setActiveEvent,
};
type DispatchPropsType = typeof mapDispatchToProps;
type PropsType = DispatchPropsType;
const AddNewFab = ({
  openModal: dispatchOpenModal,
  setActiveEvent: dispatchSetActiveEvent,
}: PropsType) => {
  const handleButtonClick = (e: AppClickEvent) => {
    dispatchSetActiveEvent(null);
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
