import {FetchMock} from 'jest-fetch-mock/types';
import {AnyAction} from 'redux';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import {login, startLogin} from '../../src/app/reducers/authActions';

Storage.prototype.setItem = jest.fn();
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store: MockStoreEnhanced;
describe('authActions', () => {
  beforeEach(() => {
    store = mockStore({});
    (fetch as FetchMock).resetMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('startLogin with a success scenario', async () => {
    const loginPayload = {
      id: 'id',
      name: 'name',
      email: 'email',
    };
    (fetch as FetchMock).mockResponseOnce(
      JSON.stringify({
        ok: true,
        token: 'test token',
        'token-init-date': 'init date',
        ...loginPayload,
      }),
    );
    await store.dispatch(
      (startLogin('test@email.com', '123456') as unknown) as AnyAction,
    );
    const actions = store.getActions();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String),
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(String),
    );
    expect(actions[0]).toEqual(login({uid: loginPayload.id, ...loginPayload}));
  });

  test('startLogin with a fail scenario', async () => {
    (fetch as FetchMock).mockResponseOnce(
      JSON.stringify({
        ok: false,
        msg: 'Something went wrong',
      }),
    );
    await store.dispatch(
      (startLogin('test@email.com', '123456') as unknown) as AnyAction,
    );
    expect(store.getActions()).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Something went wrong',
      'error',
    );
  });
});
