import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {mount, ReactWrapper} from 'enzyme';
import React from 'react';
import {Provider} from 'react-redux';

// eslint-disable-next-line import/no-named-as-default
import LoginScreen from '../../../src/app/components/auth/LoginScreen';
import {startLogin} from '../../../src/app/reducers/authActions';

jest.mock('../../../src/app/reducers/authActions', () => {
  return {
    startLogin: jest.fn(),
  };
});

const middleware = [thunk];
const mockStoreProvider = configureStore(middleware);
const store = mockStoreProvider({});
store.dispatch = jest.fn();
let wrapper: ReactWrapper;

describe('Login screen', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  test('Should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('Should dispatch start login', () => {
    wrapper
      .find('input[name="lEmail"]')
      .simulate('change', {target: {name: 'lEmail', value: 'test@email.com'}});
    wrapper
      .find('input[name="lPassword"]')
      .simulate('change', {target: {name: 'lPassword', value: 'password'}});
    wrapper.find('.login-form-1 form').simulate('submit');
    expect(startLogin).toHaveBeenCalledWith('test@email.com', 'password');
  });
});
