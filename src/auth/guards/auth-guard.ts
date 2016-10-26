import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Auth } from '../../models/auth';
import { getRetryLogged } from '../reducers/login';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<Auth>,
    private router: Router) {}

  /**
   * Take the auth part of the sate, and filter
   * states where retry loging actions are still not
   * dispatched.
   * TLDR: Get the latest state after try to login from
   * "firebase" session
   */
  canActivate(): Observable<boolean> {
    return this.store
      .select('auth')
      .let(getRetryLogged())
      .map((c: Auth) => {
          if (!c.isLogged) {
            this.router.navigate(['/']);
          }
          return c.isLogged;
      }).take(1);
  }

}
