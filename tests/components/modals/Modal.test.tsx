/* eslint-disable @typescript-eslint/no-explicit-any */
import {mount} from 'enzyme';
import moment from 'moment';
import React from 'react';
import {act} from 'react-dom/test-utils';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import Modal from '../../../src/app/components/modals/Modal';
import {
  startAddActiveEvent,
  startUpdateEvent,
} from '../../../src/app/reducers/calendarActions';

jest.mock('../../../src/app/reducers/calendarActions', () => {
  return {
    startUpdateEvent: jest.fn(),
    startAddActiveEvent: jest.fn(),
  };
});
jest.mock('sweetalert2', () => {
  return {
    fire: jest.fn(),
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
    wrapper.find('form').prop('onSubmit')({preventDefault() {}} as any);
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
    const testStore = mockStoreProvider({
      calendar: {
        events: [],
        activeEvent: null,
      },
      ui: {
        modalOpen: true,
      },
    });
    testStore.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );
    act(() => {
      wrapper.find('form').prop('onSubmit')({preventDefault() {}} as any);
      wrapper.mount();
    });
    expect(wrapper.find('input[name="title"]').hasClass('is-invalid'));
  });
  test('Should dispatch add active event', () => {
    const testStore = mockStoreProvider({
      calendar: {
        events: [],
        activeEvent: null,
      },
      ui: {
        modalOpen: true,
      },
    });
    testStore.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={testStore}>
        <Modal />
      </Provider>,
    );
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'title',
      },
    });
    act(() => {
      wrapper.find('form').simulate('submit');
    });
    expect(startAddActiveEvent).toHaveBeenCalledWith({
      end: expect.anything(),
      notes: '',
      start: expect.anything(),
      title: 'title',
    });
  });
  test('Should validate dates before submiting', () => {
    const testStore = mockStoreProvider({
      calendar: {
        events: [],
        activeEvent: null,
      },
      ui: {
        modalOpen: true,
      },
    });
    testStore.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={testStore}>
        <Modal />
      </Provider>,
    );
    const nowDate = moment().subtract('1 hour').toDate();
    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(nowDate as any);
      wrapper.mount();
    });
    wrapper.find('form').simulate('submit');
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'The end date cannot be before the start date',
    );
  });
});
