

import { Action } from '@ngrx/store';

import {
  FirebaseAuthState } from 'angularfire2';

export class AuthActions {

  static AUTH_LOGIN = 'AUTH_LOGIN';
  static AUTH_LOGINOK = 'AUTH_LOGINOK';
  static AUTH_LOGINKO = 'AUTH_LOGINKO';
  static AUTH_LOGINRESTORE = 'AUTH_LOGINRESTORE';
  static AUTH_LOGINRESTOREKO = 'AUTH_LOGINRESTOREKO';


  static actionLoginOk(res: FirebaseAuthState): Action {
    return {
      type: AuthActions.AUTH_LOGINOK,
      payload: {
        // accessToken: res.auth.credential.accessToken,
        id: res.uid,
        email: res.auth.email,
        photo: res.auth.photoURL,
        name: res.auth.displayName
      }
    };
  }

  static actionLoginKo(err): Action {
    return {
      type: AuthActions.AUTH_LOGINKO,
      payload: {error: err}
    };
  }

  static actionLogin(): Action {
    return {
      type: AuthActions.AUTH_LOGIN
    };
  }

  static actionLoginRestore(): Action {
    return {
      type: AuthActions.AUTH_LOGINRESTORE
    };
  }

  static actionLoginRestoreKo(): Action {
    return {
      type: AuthActions.AUTH_LOGINRESTOREKO
    };
  }

}
