/* eslint-disable @typescript-eslint/indent */
import {ThunkAction} from 'redux-thunk';
import Swal from 'sweetalert2';
import {IAppCalendarEvent} from '../components/calendar/CalendarModel';
import {appFetchWithToken} from '../helpers/fetch';
import {sanitizeEvents} from '../helpers/events';
import {IStoreState} from '../store/storeModel';

export const SET_ACTIVE_EVENT = '[CALENDAR] Set Active Event';
export const ADD_ACTIVE_EVENT = '[CALENDAR] Add Active Event';
export const UPDATE_EVENT = '[CALENDAR] Update Event';
export const DELETE_EVENT = '[CALENDAR] Delete Event';
export const GET_EVENTS = '[CALENDAR] Get Events';

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

interface IGetEvents {
  type: typeof GET_EVENTS;
  payload: IAppCalendarEvent[];
}

export type CalendarActionsTypes =
  | ISetActiveEvent
  | IAddEvent
  | IEventUpdated
  | IEventDelete
  | IGetEvents;

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

export const startAddActiveEvent = (
  event: Omit<IAppCalendarEvent, 'id'>,
): ThunkAction<void, IStoreState, void, CalendarActionsTypes> => {
  return async (dispatch, getState) => {
    const {uid, name, email} = getState().auth;
    try {
      const response = await appFetchWithToken('events', 'POST', {
        title: event.title,
        notes: event.notes || '',
        start: event.start?.getTime(),
        end: event.end?.getTime(),
      });
      const body = await response?.json();
      dispatch(
        addActiveEvent({
          id: body.event.id,
          title: event.title,
          notes: event.notes,
          start: event.start,
          end: event.end,
          user: {
            uid: uid as string,
            name: name as string,
            email: email as string,
          },
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateEvent = (event: IAppCalendarEvent): CalendarActionsTypes => {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
};

export const startUpdateEvent = (
  event: IAppCalendarEvent,
): ThunkAction<void, IStoreState, void, CalendarActionsTypes> => {
  return async (dispatch) => {
    let body;
    try {
      const response = await appFetchWithToken(
        `events/${event.id}`,
        'PUT',
        event,
      );
      body = await response?.json();
      if (body.ok) {
        const [sanitizedEvent] = sanitizeEvents([body.event]);
        dispatch(
          updateEvent({
            title: sanitizedEvent.title,
            notes: sanitizedEvent.notes,
            start: sanitizedEvent.start,
            end: sanitizedEvent.end,
            id: sanitizedEvent.id,
          }),
        );
      }
    } catch (err) {
      if (body && body.ok) {
        Swal.fire('Error', err, 'error');
      }
      console.log(err);
    }
  };
};

export const deleteEvent = (eventId: string): CalendarActionsTypes => {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
};

export const startDeleteEvent = (): ThunkAction<
  void,
  IStoreState,
  void,
  CalendarActionsTypes
> => {
  return async (dispatch, getState) => {
    let body;
    try {
      const {id: eventId} = getState().calendar
        .activeEvent as IAppCalendarEvent;
      const response = await appFetchWithToken(`events/${eventId}`, 'DELETE');
      body = await response?.json();
      if (body.ok && eventId) {
        dispatch(deleteEvent(eventId));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getEvents = (
  events: IAppCalendarEvent[],
): CalendarActionsTypes => {
  return {
    type: GET_EVENTS,
    payload: events,
  };
};

export const startGetEvents = (): ThunkAction<
  void,
  IStoreState,
  void,
  CalendarActionsTypes
> => {
  return async (dispatch) => {
    try {
      const response = await appFetchWithToken('events', 'GET');
      const body = await response?.json();
      const sanitizedEvents = sanitizeEvents(
        body.events as IAppCalendarEvent[],
      );
      dispatch(getEvents(sanitizedEvents));
    } catch (err) {
      console.log(err);
    }
  };
};
