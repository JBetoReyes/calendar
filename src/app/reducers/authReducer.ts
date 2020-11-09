import {AuthActionsType} from './authActions';
import {IAuthState} from './authModel';

const initialValue: IAuthState = {
  checking: true,
  uid: null,
  name: null,
  email: null,
};

const AuthReducer = (
  state: IAuthState = initialValue,
  action: AuthActionsType,
): IAuthState => {
  switch (action.type) {
    case '[AUTH] Login.':
      return {
        ...state,
        ...action.payload,
        checking: false,
      };
    case '[AUTH] Checked.':
      return {
        ...state,
        checking: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
