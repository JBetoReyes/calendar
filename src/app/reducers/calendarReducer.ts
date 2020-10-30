import moment from 'moment';
import {
  ADD_ACTIVE_EVENT,
  CalendarActionsTypes,
  SET_ACTIVE_EVENT,
} from './calendarActions';
import { ICalendarState } from './calendarModel';

const initialValue: ICalendarState = {
  events: [
    {
      title: 'birthday',
      notes: '',
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
    },
  ],
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
        activeEvent: {
          ...action.payload,
        },
      };
    case ADD_ACTIVE_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    default:
      return state;
  }
};

export default CalendarReducer;
