
import { Injectable } from '@ngular/core';

import { Actions, Effect } from '@ngrx/effects';
import {
  AuthProviders,
  FirebaseAuth,
  FirebaseAuthState } from 'angularfire2';


import 'rxjs/add/operators/switchmap';
import 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { AuthActions } from './auth.actions';



@Injectable()
export class AuthEffects {


  @Effect()
  login$ = this.actions$
        .ofType(AuthActions.AUTH_LOGIN)
        .switchMap(this.login);


  constructor(
    private actions$: Actions,
    public auth$: FirebaseAuth) {}

  private login(a): Observable<FirebaseAuthState> {
    return fromPromise.call(this.auth$
      .login(AuthProviders.Google))
      .map(res => AuthActions.actionLoginOk(res))
      .catch(
        () => Observable.of(AuthActions.actionLoginKo())
      );
  }



}
