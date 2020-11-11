import {FetchMock} from 'jest-fetch-mock/types';
import {AnyAction} from 'redux';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import thunk from 'redux-thunk';

import {login, startLogin} from '../../src/app/reducers/authActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store: MockStoreEnhanced;
describe('authActions', () => {
  beforeEach(() => {
    store = mockStore({});
    (fetch as FetchMock).resetMocks();
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
    expect(actions[0]).toEqual(login({uid: loginPayload.id, ...loginPayload}));
  });
});
