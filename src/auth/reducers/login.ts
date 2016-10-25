
import { Action } from '@ngrx/store';

import { AuthActions } from '../auth.actions';
import { User } from '../../models/user';


export interface State {
  isLogging: boolean;
  isLogged: boolean;
  user?: User;
}

const ini: State = {
  isLogging: false,
  isLogged: false
};

export function authReducer(state = ini, action: Action): State {
  switch (action.type) {
    case AuthActions.AUTH_LOGINOK:
      return Object.assign({}, state, {
        isLogged: true,
        isLogging: false,
        user: action.payload
      });
    case AuthActions.AUTH_LOGINKO:
      return Object.assign({}, state, {
        isLogged: false,
        isLogging: false
      });
    case AuthActions.AUTH_LOGIN: {
      return Object.assign({}, state, {
        isLogging: true
      });
    }
    default:
      return state;
  }
}
