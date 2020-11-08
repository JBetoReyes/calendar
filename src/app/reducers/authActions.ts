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

interface IStartLogin {
  type: typeof START_LOGIN;
}

export type AuthActionsType = IAuthChecking | IAuthCheckingFinish | IStartLogin;

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

export const startLogin = async (
  email: string,
  password: string,
): Promise<AuthActionsType> => {
  console.log(email, password);
  return {
    type: START_LOGIN,
  };
};
