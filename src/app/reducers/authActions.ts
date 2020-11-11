/* eslint-disable @typescript-eslint/indent */
import {ThunkAction} from 'redux-thunk';
import Swal from 'sweetalert2';
import {IAppUser} from '../components/auth/UserModel';
import {appFetch, appFetchWithToken} from '../helpers/fetch';
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

interface ILogout {
  type: typeof LOGOUT;
}

interface IStartRegister {
  type: typeof START_REGISTER;
  payload: Pick<IAppUser, 'name' | 'email'> & {password: string};
}

export type AuthActionsType =
  | IAuthChecking
  | IAuthCheckingFinish
  | IStartLogin
  | ILogin
  | ILogout
  | IStartRegister;

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

export const login = (
  payload: Pick<IAppUser, 'uid' | 'name' | 'email'>,
): AuthActionsType => {
  return {
    type: LOGIN,
    payload: {
      uid: payload.uid,
      name: payload.name,
      email: payload.email,
    },
  };
};

export const startLogin = (
  email: string,
  password: string,
): ThunkAction<void, IStoreState, void, AuthActionsType> => {
  return async (dispatch) => {
    const resp = await appFetch('auth', 'POST', {email, password});
    const body = await resp?.json();
    if (body && body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', `${new Date().getTime()}`);
      dispatch(
        login({
          uid: body.id,
          name: body.name,
          email: body.email,
        }),
      );
    } else {
      const msg = body && body.msg ? body.msg : '';
      Swal.fire('Error', msg, 'error');
    }
  };
};

export const logout = (): AuthActionsType => {
  return {
    type: LOGOUT,
  };
};

export const startLogout = (): ThunkAction<
  void,
  IStoreState,
  void,
  AuthActionsType
> => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

export const startRegister = (
  name: string,
  email: string,
  password: string,
): ThunkAction<void, IStoreState, void, AuthActionsType> => {
  return async (dispatch) => {
    const response = await appFetch('auth/new', 'POST', {
      name,
      email,
      password,
    });
    const body = await response?.json();
    if (body && body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', `${new Date().getTime()}`);
      dispatch(
        login({
          uid: body.id,
          name: body.name,
          email: body.email,
        }),
      );
    } else {
      const msg = body && body.msg ? body.msg : '';
      Swal.fire('Error', msg, 'error');
    }
  };
};

export const renewToken = (): ThunkAction<
  void,
  IStoreState,
  void,
  AuthActionsType
> => {
  return async (dispatch) => {
    const response = await appFetchWithToken('auth/renew');
    const body = await response?.json();
    if (body && body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', `${new Date().getTime()}`);
      dispatch(
        login({
          uid: body.id,
          name: body.name,
          email: body.email,
        }),
      );
    } else {
      dispatch(authChecked());
    }
  };
};
