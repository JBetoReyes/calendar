import React, {ComponentType} from 'react';
import {render, mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import thunk from 'redux-thunk';

import DeleteFab from '../../../src/app/components/ui/DeleteFab';
import {startDeleteEvent} from '../../../src/app/reducers/calendarActions';

jest.mock('../../../src/app/reducers/calendarActions', () => {
  return {
    startDeleteEvent: jest.fn(),
  };
});

type RenderType = typeof render | typeof mount | typeof shallow;
const setup = (
  Component: ComponentType,
  props: Partial<Record<string, unknown>> = {},
  renderType: RenderType = mount,
) => {
  return (renderType as CallableFunction)(<Component {...props} />);
};

const middlewares = [thunk];
const mockStoreProvider = configureStore(middlewares);
let store: MockStoreEnhanced;
describe('DeleteFab', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  test('Should match with snapshot', () => {
    store = mockStoreProvider({
      calendar: {
        activeEvent: {},
      },
    });
    const component = () => (
      <Provider store={store}>
        <DeleteFab />
      </Provider>
    );
    const wrapper = setup(component);
    expect(wrapper).toMatchSnapshot();
  });
  test('should call the the delete event', () => {
    store = mockStoreProvider({calendar: {activeEvent: {}}});
    store.dispatch = jest.fn();
    const component = () => {
      return (
        <Provider store={store}>
          <DeleteFab />
        </Provider>
      );
    };
    const wrapper = setup(component) as ReturnType<typeof mount>;
    wrapper.find('button.btn').simulate('click');
    expect(startDeleteEvent).toBeCalledWith();
  });
});
