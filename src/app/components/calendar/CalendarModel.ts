import { Event as CalendarEvent } from 'react-big-calendar';
import { IAppUser } from '../auth/UserModel';

export interface IAppCalendarEvent extends CalendarEvent {
  user?: IAppUser;
}
