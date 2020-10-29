import { CalendarActionsTypes, SET_ACTIVE_EVENT } from './calendarActions';
import { ICalendarState } from './calendarModel';

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
        activeEvent: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default CalendarReducer;
