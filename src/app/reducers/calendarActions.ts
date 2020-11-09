import {ThunkAction} from 'redux-thunk';
import {IAppCalendarEvent} from '../components/calendar/CalendarModel';
import {appFetchWithToken} from '../helpers/fetch';
import {IStoreState} from '../store/storeModel';

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

export const startAddActiveEvent = (
  event: Omit<IAppCalendarEvent, 'id'>,
): ThunkAction<void, IStoreState, void, CalendarActionsTypes> => {
  return async (dispatch, getState) => {
    const {uid, name, email} = getState().auth;
    try {
      const response = await appFetchWithToken('events', 'POST', {
        title: event.title,
        notes: event.notes || '',
        start: event.start,
        end: event.end,
      });
      const body = await response?.json();
      dispatch(
        addActiveEvent({
          id: body.id,
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
