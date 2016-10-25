

import { Action } from '@ngrx/store';

import {
  FirebaseAuthState } from 'angularfire2';

export class AuthActions {

  static AUTH_LOGIN = 'AUTH_LOGIN';
  static AUTH_LOGINOK = 'AUTH_LOGINOK';
  static AUTH_LOGINKO = 'AUTHL_LOGINKO';

  static actionLoginOk(res: FirebaseAuthState): Action {
    return {
      type: AuthActions.AUTH_LOGINOK,
      payload: {
        // accessToken: res.auth.credential.accessToken,
        id: res.auth.uid,
        email: res.auth.email,
        photo: res.auth.photoURL,
        name: res.auth.displayName
      }
    };
  }

  static actionLoginKo(): Action {
    return {
      type: AuthActions.AUTH_LOGINKO
    };
  }

  static actionLogin(): Action {
    return {
      type: AuthActions.AUTH_LOGIN
    };
  }

}
