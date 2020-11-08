/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {connect} from 'react-redux';
import {IStoreState} from 'src/app/store/storeModel';
import {AppClickEvent} from 'src/typings/htmlEvents';
import {deleteEvent} from '../../reducers/calendarActions';
import {IAppCalendarEvent} from '../calendar/CalendarModel';

const mapDispatchToProps = {
  deleteEvent,
};
const mapStateToProps = (state: IStoreState) => ({
  activeEvent: state.calendar.activeEvent,
});
type DispatchPropsType = typeof mapDispatchToProps;
type MapStateToPropsType = ReturnType<typeof mapStateToProps>;
type OwnPropsType = Record<string, any>;
type PropsType = DispatchPropsType & MapStateToPropsType;
const DeleteFab = (props: OwnPropsType): JSX.Element => {
  const {activeEvent, deleteEvent: dispatchDeleteEvent} = props as PropsType;
  const handleDeleteEvent = (e: AppClickEvent) => {
    dispatchDeleteEvent((activeEvent as IAppCalendarEvent).id);
  };
  return (
    <button
      type="button"
      className="btn btn-danger position-fixed fixed-bottom m-5"
      onClick={handleDeleteEvent}
    >
      <FontAwesomeIcon icon={faTrash} size="1x" /> Delete
    </button>
  );
};

export default connect<
  MapStateToPropsType,
  DispatchPropsType,
  OwnPropsType,
  IStoreState
>(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteFab);