import {login, authChecked, logout} from '../../src/app/reducers/authActions';
import authReducer from '../../src/app/reducers/authReducer';

describe('authReducer', () => {
  test('reducer should return default state', () => {
    const initialState = {
      checking: true,
      uid: null,
      name: null,
      email: null,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state = authReducer(initialState, {} as any);
    expect(state).toEqual(initialState);
  });
  test('reducer should set user data when login', () => {
    const initialState = {
      checking: true,
      uid: null,
      name: null,
      email: null,
    };
    const state = authReducer(
      initialState,
      login({
        uid: 'test uid',
        name: 'test name',
        email: 'test email',
      }),
    );
    expect(state).toEqual({
      checking: false,
      uid: 'test uid',
      name: 'test name',
      email: 'test email',
    });
  });
  test('reducer should set the check flag to false when trigger checked action', () => {
    const initialState = {
      checking: true,
      uid: null,
      name: null,
      email: null,
    };
    const state = authReducer(initialState, authChecked());
    expect(state.checking).toBe(false);
  });
  test('reducer should clean the state when login out', () => {
    const currentState = {
      checking: false,
      uid: 'test uid',
      name: 'test name',
      email: 'test email',
    };
    const state = authReducer(currentState, logout());
    expect(state).toEqual({
      checking: false,
      uid: null,
      name: null,
      email: null,
    });
  });
});
