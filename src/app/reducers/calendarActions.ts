import {IAppCalendarEvent} from '../components/calendar/CalendarModel';

export const SET_ACTIVE_EVENT = '[CALENDAR] Set Active Event';
export const ADD_ACTIVE_EVENT = '[CALENDAR] Add Active Event';
export const UPDATE_EVENT = '[CALENDAR] Update Event';
export const DELETE_EVENT = '[CALENDAR] Delete Event';

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

interface IEventDelete {
  type: typeof DELETE_EVENT;
  payload: string;
}

export type CalendarActionsTypes =
  | ISetActiveEvent
  | IAddEvent
  | IEventUpdated
  | IEventDelete;

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

export const deleteEvent = (eventId: string): CalendarActionsTypes => {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
};
