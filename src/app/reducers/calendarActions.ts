import { IAppCalendarEvent } from '../components/calendar/CalendarModel';

export const SET_ACTIVE_EVENT = '[CALENDAR] Set Active Event';
export const ADD_ACTIVE_EVENT = '[CALENDAR] Add Active Event';

interface ISetActiveEvent {
  type: typeof SET_ACTIVE_EVENT;
  payload: IAppCalendarEvent;
}

interface IAddEvent {
  type: typeof ADD_ACTIVE_EVENT;
  payload: IAppCalendarEvent;
}

export type CalendarActionsTypes = ISetActiveEvent | IAddEvent;

export const setActiveEvent = (
  event: IAppCalendarEvent,
): CalendarActionsTypes => {
  return {
    type: SET_ACTIVE_EVENT,
    payload: event,
  };
};

export const addActiveEvent = (
  event: IAppCalendarEvent,
): CalendarActionsTypes => {
  return {
    type: ADD_ACTIVE_EVENT,
    payload: event,
  };
};
