import { IAppCalendarEvent } from '../components/calendar/CalendarModel';

export interface ICalendarState {
  events: IAppCalendarEvent[];
  activeEvent: IAppCalendarEvent | null;
}
