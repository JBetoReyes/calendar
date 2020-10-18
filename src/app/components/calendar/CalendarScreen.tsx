import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Calendar as BigCalendar,
  Event,
  momentLocalizer,
  View,
} from 'react-big-calendar';
import moment from 'moment';
import Navbar from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarScreen.scss';
import CalendarEvent from './CalendarEvent';
import { IAppCalendarEvent } from './CalendarModel';
import Modal from '../modals/Modal';

const localizer = momentLocalizer(moment);

const events: IAppCalendarEvent[] = [
  {
    title: 'birthday',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
  },
];

const CalendarScreen = (): JSX.Element => {
  const storedView = (localStorage.getItem('view') || 'month') as View;
  const [calendarView, setCalendarView] = useState<View>(storedView);
  const onDoubleClick = (e: IAppCalendarEvent) => {
    console.log(e);
  };
  const onSelectEvent = (e: IAppCalendarEvent) => {
    console.log(e);
  };
  const onViewCahnge = (selectedView: View) => {
    localStorage.setItem('view', selectedView);
    setCalendarView(selectedView);
    console.log(selectedView);
  };
  return (
    <div className="calendar-screen">
      <Navbar />
      <BigCalendar<IAppCalendarEvent>
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewCahnge}
        view={calendarView}
        components={{
          event: CalendarEvent,
        }}
      />
      <Modal />
    </div>
  );
};

CalendarScreen.propTypes = {};

export default CalendarScreen;
