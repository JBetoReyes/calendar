/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  View,
} from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import { IStoreState } from 'src/app/store/storeModel';
import Navbar from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarScreen.scss';
import CalendarEvent from './CalendarEvent';
import { IAppCalendarEvent } from './CalendarModel';
import Modal from '../modals/Modal';
import { openModal } from '../../reducers/uiActions';
import { setActiveEvent } from '../../reducers/calendarActions';
import AddNewFab from '../ui/AddNewFab';

const localizer = momentLocalizer(moment);

const events: IAppCalendarEvent[] = [
  {
    title: 'birthday',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
  },
];

const mapStateToProps = (state: IStoreState) => ({
  calendar: state.calendar,
});

const mapDispatchToProps = {
  openModal,
  setActiveEvent,
};

type DispatchPropsType = typeof mapDispatchToProps;
type MapStateToPropsType = ReturnType<typeof mapStateToProps>;

type MyProps = DispatchPropsType;
type PropsType = MyProps & MapStateToPropsType;
const CalendarScreen = (props: MyProps): JSX.Element => {
  const {
    openModal: dispatchOpenModal,
    setActiveEvent: dispatchSetActiveEvent,
  } = props;
  const { calendar } = props as PropsType;
  const storedView = (localStorage.getItem('view') || 'month') as View;
  const [calendarView, setCalendarView] = useState<View>(storedView);
  const onDoubleClick = (e: IAppCalendarEvent) => {
    dispatchOpenModal();
  };
  const onSelectEvent = (e: IAppCalendarEvent) => {
    dispatchSetActiveEvent(e);
  };
  const onViewChange = (selectedView: View) => {
    localStorage.setItem('view', selectedView);
    setCalendarView(selectedView);
  };
  return (
    <div className="calendar-screen">
      <Navbar />
      <BigCalendar<IAppCalendarEvent>
        localizer={localizer}
        events={calendar.events}
        startAccessor="start"
        endAccessor="end"
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={calendarView}
        components={{
          event: CalendarEvent,
        }}
      />
      <AddNewFab />
      <Modal />
    </div>
  );
};

CalendarScreen.propTypes = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default connect<
  MapStateToPropsType,
  DispatchPropsType,
  MyProps,
  IStoreState
>(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarScreen);
