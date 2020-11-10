import React from 'react';
import {EventProps} from 'react-big-calendar';
import PropTypes from 'prop-types';
import {IAppCalendarEvent} from './CalendarModel';

type Props = EventProps<IAppCalendarEvent>;
const CalendarEvent: React.ComponentType<Props> = ({event}) => {
  return (
    <div>
      {event && (
        <>
          <span>{event.title}</span>
          {event.user && <strong>{event.user.name}</strong>}
        </>
      )}
    </div>
  );
};

CalendarEvent.propTypes = {
  // @ts-ignore
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
};

CalendarEvent.defaultProps = {
  event: undefined,
};

export default CalendarEvent;
