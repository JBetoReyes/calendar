import { ICalendarState } from '../reducers/calendarModel';
import { IUIState } from '../reducers/uiModel';

export interface IStoreState {
  ui: IUIState;
  calendar: ICalendarState;
}
