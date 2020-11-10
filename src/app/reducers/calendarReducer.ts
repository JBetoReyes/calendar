import {
  ADD_ACTIVE_EVENT,
  CalendarActionsTypes,
  DELETE_EVENT,
  GET_EVENTS,
  SET_ACTIVE_EVENT,
  UPDATE_EVENT,
} from './calendarActions';
import {ICalendarState} from './calendarModel';

const initialValue: ICalendarState = {
  events: [],
  activeEvent: null,
};

const CalendarReducer = (
  state: ICalendarState = initialValue,
  action: CalendarActionsTypes,
): ICalendarState => {
  switch (action.type) {
    case SET_ACTIVE_EVENT:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case ADD_ACTIVE_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) => {
          if (event.id === action.payload.id) {
            return {
              ...action.payload,
            };
          }
          return {
            ...event,
          };
        }),
      };
    case DELETE_EVENT:
      return {
        activeEvent: null,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case GET_EVENTS:
      return {
        activeEvent: null,
        events: [...action.payload],
      };
    default:
      return state;
  }
};

export default CalendarReducer;
