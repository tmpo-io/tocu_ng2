// import * as firebase from 'firebase';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
// import { FirebaseAuth } from 'angularfire2';

// import { AuthActions } from '../auth.actions';
import { getRetryLogged } from '../reducers/login';
import { Auth } from '../../models/auth';

import { getName }  from '../../shared/utils';

@Injectable()
export class AuthService {
  private authState: Auth = null;

  constructor(
    private store$: Store<Auth>) {
    store$.select('auth')
      .let(getRetryLogged())
      .subscribe(state => {
        // console.log('[AuthService] const', state);
        this.authState = state as Auth;
      });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get id(): string {
    return this.authenticated ? this.authState.user.id : '';
  }

  username(): string {
    return getName(this.authState.user.email);
  }

  signOut(): void {
    // this.auth$.logout();
  }
}



