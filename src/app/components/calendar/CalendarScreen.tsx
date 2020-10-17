import React from 'react';
import PropTypes from 'prop-types';
import {
  Calendar as BigCalendar,
  Event,
  momentLocalizer,
} from 'react-big-calendar';
import moment from 'moment';
import Navbar from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarScreen.scss';
import CalendarEvent from './CalendarEvent';
import { IAppCalendarEvent } from './CalendarModel';

const localizer = momentLocalizer(moment);

const events: IAppCalendarEvent[] = [
  {
    title: 'birthday',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
  },
];

const CalendarScreen = (): JSX.Element => {
  return (
    <div className="calendar-screen">
      <Navbar />
      <BigCalendar<IAppCalendarEvent>
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        components={{
          event: CalendarEvent,
        }}
      />
    </div>
  );
};

CalendarScreen.propTypes = {};

export default CalendarScreen;
