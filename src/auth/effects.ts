
import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import {
  AuthProviders,
  FirebaseAuth
} from 'angularfire2';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/observable/of';
import 'rxjs/observable/fromPromise';

import { AuthActions } from './auth.actions';



@Injectable()
export class AuthEffects {


  @Effect()
  login$ = this.actions$
      .ofType(AuthActions.AUTH_LOGIN)
      .switchMap((d) => {
        return Observable.fromPromise(
          this.auth$
            .login(AuthProviders.Google) as Promise<any>)
            .map(res => AuthActions.actionLoginOk(res))
            .catch(
              () => Observable.of(AuthActions.actionLoginKo())
            );
      });


  constructor(
    private actions$: Actions,
    public auth$: FirebaseAuth) {}

  // login(a): Observable<FirebaseAuthState> {
  //   return fromPromise.call(this.auth$
  //     .login(AuthProviders.Google))
  //     .map(res => AuthActions.actionLoginOk(res))
  //     .catch(
  //       () => Observable.of(AuthActions.actionLoginKo())
  //     );
  // }



}
