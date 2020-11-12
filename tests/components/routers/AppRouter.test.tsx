import {mount} from 'enzyme';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AppRouter from '../../../src/app/components/routers/AppRouter';

const middlewares = [thunk];
const mockStoreProvider = configureStore(middlewares);
let store;
describe('AppRouter', () => {
  test('should match with snapshot', () => {
    store = mockStoreProvider({
      auth: {
        checking: true,
        uid: null,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('should render the login screen', () => {
    store = mockStoreProvider({
      auth: {
        checking: false,
        uid: null,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>,
    );
    expect(wrapper.find('.login-container').length).toBe(1);
  });
  test('should render the calendar screen', () => {
    store = mockStoreProvider({
      auth: {
        checking: false,
        uid: 'mock uid',
      },
      calendar: {
        events: [],
      },
      ui: {
        modalOpen: false,
      }
    });
    store.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>,
    );
    expect(wrapper.find('.calendar-screen').length).toBe(1);
  });
});
