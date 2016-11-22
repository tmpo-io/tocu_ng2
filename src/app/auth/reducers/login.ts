
import { Action } from '@ngrx/store';

import { AuthActions } from '../auth.actions';
// import { User } from '../../models/user';
import { Auth } from '../../models/auth';


export const initial: Auth = {
  hasTryRestore: false,
  isLogged: false,
  isLogging: false,
  user: {}
};



export function authReducer(state = initial, action: Action): Auth {
  // console.log("Action Provided", action, state);
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
        isLogging: false,
        error: action.payload.error
      });
    case AuthActions.AUTH_LOGIN: {
      return Object.assign({}, state, {
        isLogging: true
      });
    }
    case AuthActions.AUTH_LOGINRESTORE: {
      return Object.assign({}, state, {
        hasTryRestore: true,
        isLogging: true
      });
    }
    case AuthActions.AUTH_LOGINRESTOREKO: {
      return Object.assign({}, state, {
        hasTryRestore: true,
        isLogging: false
      });
    }

    default:
      return state;
  }
}


// Selectors

export function getRetryLogged() {
  return $state => $state
    .filter((auth: Auth) => auth.hasTryRestore && !auth.isLogging);
}

