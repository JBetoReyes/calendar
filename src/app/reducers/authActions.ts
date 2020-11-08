import {ThunkAction} from 'redux-thunk';
import {IAppUser} from '../components/auth/UserModel';
import {appFetch} from '../helpers/fetch';
import {IStoreState} from '../store/storeModel';

export const AUTH_CHECKING = '[AUTH] Checking login state.';
export const AUTH_CHECKED = '[AUTH] Checked.';
export const START_LOGIN = '[AUTH] Start login.';
export const LOGIN = '[AUTH] Login.';
export const START_REGISTER = '[AUTH] Start register.';
export const TOKEN_RENEW = '[AUTH] Token renew.';
export const LOGOUT = '[AUTH] Logout.';

interface IAuthChecking {
  type: typeof AUTH_CHECKING;
}

interface IAuthCheckingFinish {
  type: typeof AUTH_CHECKED;
}

interface IStartLogin {
  type: typeof START_LOGIN;
}

interface ILogin {
  type: typeof LOGIN;
  payload: IAppUser;
}

export type AuthActionsType =
  | IAuthChecking
  | IAuthCheckingFinish
  | IStartLogin
  | ILogin;

export const startCheckAuth = (): AuthActionsType => {
  return {
    type: AUTH_CHECKING,
  };
};

export const authChecked = (): AuthActionsType => {
  return {
    type: AUTH_CHECKED,
  };
};

export const startLogin = (
  email: string,
  password: string,
): ThunkAction<void, IStoreState, void, AuthActionsType> => {
  return async (dispatch) => {
    const resp = await appFetch('auth', 'POST', {email, password});
    const body = await resp?.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', `${new Date().getTime()}`);
      dispatch(
        login({
          uid: body.id,
          name: body.name,
          email: body.email,
        }),
      );
    }
  };
};

export const login = (
  payload: Pick<IAppUser, 'uid' | 'name' | 'email'>,
): AuthActionsType => {
  return {
    type: LOGIN,
    payload,
  };
};
