import {mount} from 'enzyme';
import moment from 'moment';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Modal from '../../../src/app/components/modals/Modal';

const middlewares = [thunk];
const mockStoreProvider = configureStore(middlewares);
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const initialEndDate = now.clone().add(1, 'hours');
const store = mockStoreProvider({
  calendar: {
    events: [],
    activeEvent: {
      title: 'title',
      notes: 'notes',
      start: now,
      initialEndDate,
    },
  },
  ui: {
    modalOpen: true,
  },
});
const wrapper = mount(
  <Provider store={store}>
    <Modal />
  </Provider>,
);

describe('Modal', () => {
  test('Should show the modal', () => {
    expect(wrapper.find('Connect(Modal) > Modal').prop('isOpen')).toBe(true);
  });
});
