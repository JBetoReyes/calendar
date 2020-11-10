/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import {IAppCalendarEvent} from '../components/calendar/CalendarModel';

export const sanitizeEvents = (
  events: IAppCalendarEvent[],
): IAppCalendarEvent[] => {
  return events.map((calendarEvent) => ({
    ...calendarEvent,
    start: moment(calendarEvent.start).toDate(),
    end: moment(calendarEvent.end).toDate(),
  }));
};
