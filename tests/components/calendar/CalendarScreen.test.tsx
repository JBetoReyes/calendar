import {mount} from 'enzyme';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CalendarScreen from '../../../src/app/components/calendar/CalendarScreen';

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
describe('CalendarScreen', () => {
  test('Should render the calendar', () => {
    expect(wrapper.find('.rbc-calendar').length).toBe(1);
  });
});
