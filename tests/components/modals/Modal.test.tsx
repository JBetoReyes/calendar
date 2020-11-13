/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount } from 'enzyme';
import moment from 'moment';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Modal from '../../../src/app/components/modals/Modal';
import { startUpdateEvent } from '../../../src/app/reducers/calendarActions';

jest.mock('../../../src/app/reducers/calendarActions', () => {
  return {
    startUpdateEvent: jest.fn(),
    startAddActiveEvent: jest.fn(),
  };
});

const middlewares = [thunk];
const mockStoreProvider = configureStore(middlewares);
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const initialEndDate = now.clone().add(1, 'hours');
const store = mockStoreProvider({
  calendar: {
    events: [],
    activeEvent: {
      id: 'testid',
      title: 'title',
      notes: 'notes',
      start: now,
      end: initialEndDate,
    },
  },
  ui: {
    modalOpen: true,
  },
});
store.dispatch = jest.fn();

describe('Modal', () => {
  test('Should show the modal', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );
    expect(wrapper.find('Connect(Modal) > Modal').prop('isOpen')).toBe(true);
  });
  test('Should dispatch the update event', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );
    wrapper.find('form').prop('onSubmit')({ preventDefault() { } } as any);
    act(() => {
      wrapper.find('input[name="title"]').prop('onChange')({
        target: {
          name: 'title',
          value: 'title test',
        },
      } as any);
    });
    expect(startUpdateEvent).toHaveBeenCalled();
  });
  test('Should set the title field as invalis', () => {
    const store = mockStoreProvider({
      calendar: {
        events: [],
        activeEvent: null,
      },
      ui: {
        modalOpen: true,
      },
    });
    store.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );
    act(() => {
      wrapper.find('form').prop('onSubmit')({ preventDefault() { } } as any);
      wrapper.mount();
    });
    expect(wrapper.find('input[name="title"]').hasClass('is-invalid'));
  });
});
