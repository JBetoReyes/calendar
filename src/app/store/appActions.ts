import {CalendarActionsTypes} from '../reducers/calendarActions';
import {UIActionsTypes} from '../reducers/uiActions';

export type AppActions = UIActionsTypes & CalendarActionsTypes;
