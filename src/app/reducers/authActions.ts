export const AUTH_CHECKING = '[AUTH] Checking login state.';
export const AUTH_CHECKED = '[AUTH] Checked.';
export const START_LOGIN = '[AUTH] Start login.';
export const LOGIN = '[AUTH] login.';
export const START_REGISTER = '[AUTH] Start register.';
export const TOKEN_RENEW = '[AUTH] Token renew.';
export const LOGOUT = '[AUTH] Logout.';

interface IAuthChecking {
  type: typeof AUTH_CHECKING;
}

interface IAuthCheckingFinish {
  type: typeof AUTH_CHECKED;
}

export type AuthActionsType = IAuthChecking | IAuthCheckingFinish;

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
