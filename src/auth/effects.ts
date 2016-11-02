
import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
  AngularFire, AuthProviders,
} from 'angularfire2';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/observable/of';
import 'rxjs/observable/fromPromise';

import { AuthActions } from './auth.actions';
import { Auth } from '../models/auth';


const METADATA_KEY = '@ngrx/effects';

@Injectable()
export class AuthEffects {


  @Effect()
  login$() {
    return this.actions$
      .ofType(AuthActions.AUTH_LOGIN)
      .switchMap(action => {
          // console.log('action');
          return this.login()
          .map(res => AuthActions.actionLoginOk(res))
          .catch(err => of.call(
              AuthActions.actionLoginKo(err)));
      });
  }



  @Effect()
  restore$() {
    return this.actions$
      .ofType(AuthActions.AUTH_LOGINRESTORE)
      .switchMap(action => {
        console.log('Autenticating');
        return this.af.auth
          .take(1)
          .map(state => {
            console.log('[Effect] login restore:', state);
            if (state) {
              // console.log("state")
              return AuthActions.actionLoginOk(state);
            }
            return AuthActions.actionLoginRestoreKo();
          });
      });
  }


  login(): Observable<any> {
    return Observable.fromPromise(
      this.af.auth
        .login({provider: AuthProviders.Google}) as Promise<any>
    );
  }

  constructor(
    private actions$: Actions,
    public af: AngularFire,
    private store: Store<Auth>) {
      this.store.dispatch(AuthActions.actionLoginRestore());
    }


}
