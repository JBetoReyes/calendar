import {AuthActionsType} from './authActions';
import {IAuthState} from './authModel';

const initialValue: IAuthState = {
  checking: true,
  uid: null,
  name: null,
};

const AuthReducer = (
  state: IAuthState = initialValue,
  action: AuthActionsType,
): IAuthState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default AuthReducer;
