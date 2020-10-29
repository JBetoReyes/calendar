import { IAppCalendarEvent } from '../components/calendar/CalendarModel';

export const SET_ACTIVE_EVENT = '[CALENDAR] Set Active Event';

interface ISetActiveEvent {
  type: typeof SET_ACTIVE_EVENT;
  payload: IAppCalendarEvent;
}

export type CalendarActionsTypes = ISetActiveEvent;

export const setActiveEvent = (
  event: IAppCalendarEvent,
): CalendarActionsTypes => {
  return {
    type: SET_ACTIVE_EVENT,
    payload: event,
  };
};
