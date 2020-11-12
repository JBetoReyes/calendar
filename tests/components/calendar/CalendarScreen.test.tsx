/* eslint-disable @typescript-eslint/no-explicit-any */
import {mount, ReactWrapper} from 'enzyme';
import React from 'react';
import {act} from 'react-dom/test-utils';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CalendarScreen from '../../../src/app/components/calendar/CalendarScreen';
import {openModal} from '../../../src/app/reducers/uiActions';
import {setActiveEvent} from '../../../src/app/reducers/calendarActions';

jest.mock('../../../src/app/reducers/uiActions', () => {
  return {
    openModal: jest.fn(),
  };
});
jest.mock('../../../src/app/reducers/calendarActions', () => {
  return {
    setActiveEvent: jest.fn(),
    startGetEvents: jest.fn(),
  };
});
Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStoreProvider = configureStore(middlewares);
const store = mockStoreProvider({
  calendar: {events: []},
  auth: {uid: 'id'},
  ui: {modalOpen: false},
});
store.dispatch = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>,
);
const calendar = wrapper.find('Calendar') as ReactWrapper<any, any>;
describe('CalendarScreen', () => {
  test('Should render the calendar', () => {
    expect(wrapper.find('.rbc-calendar').length).toBe(1);
  });
  test('Should dispatch open modal', () => {
    calendar.prop('onDoubleClickEvent')();
    expect(openModal).toHaveBeenCalledWith();
  });
  test('Should dispatch set active event', () => {
    calendar.prop('onSelectEvent')({view: 'week'});
    expect(setActiveEvent).toHaveBeenCalledWith({view: 'week'});
  });
  test('Should set the calendar view', () => {
    act(() => {
      calendar.prop('onView')('week');
      expect(localStorage.setItem).toHaveBeenCalledWith('view', 'week');
    });
  });
});
