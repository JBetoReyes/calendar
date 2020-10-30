import { IAppCalendarEvent } from '../components/calendar/CalendarModel';

export const SET_ACTIVE_EVENT = '[CALENDAR] Set Active Event';
export const ADD_ACTIVE_EVENT = '[CALENDAR] Add Active Event';
export const UPDATE_EVENT = '[CALENDAR] Update Event';

interface ISetActiveEvent {
  type: typeof SET_ACTIVE_EVENT;
  payload: IAppCalendarEvent | null;
}

interface IAddEvent {
  type: typeof ADD_ACTIVE_EVENT;
  payload: IAppCalendarEvent;
}

interface IEventUpdated {
  type: typeof UPDATE_EVENT;
  payload: IAppCalendarEvent;
}

export type CalendarActionsTypes = ISetActiveEvent | IAddEvent | IEventUpdated;

export const setActiveEvent = (
  event: IAppCalendarEvent | null,
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

export const updateEvent = (event: IAppCalendarEvent): CalendarActionsTypes => {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
};
