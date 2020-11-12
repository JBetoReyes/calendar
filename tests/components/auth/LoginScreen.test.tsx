import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {mount, ReactWrapper} from 'enzyme';
import React from 'react';
import {Provider} from 'react-redux';
import Swal from 'sweetalert2';

// eslint-disable-next-line import/no-named-as-default
import LoginScreen from '../../../src/app/components/auth/LoginScreen';
import {startLogin, startRegister} from '../../../src/app/reducers/authActions';

jest.mock('../../../src/app/reducers/authActions', () => {
  return {
    startLogin: jest.fn(),
    startRegister: jest.fn(),
  };
});

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

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
  test('Should not dispatch start register', () => {
    wrapper.find('input[name="rPassword"]').simulate('change', {
      name: 'rPassword',
      value: '12345678',
    });
    wrapper.find('input[name="rConfirmPassword"]').simulate('change', {
      target: {
        name: 'rConfirmPassword',
        value: '123456789',
      },
    });
    wrapper.find('.login-form-2 form').simulate('submit');
    expect(startRegister).toHaveBeenCalledTimes(0);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Password should match.',
      'error',
    );
  });
});
