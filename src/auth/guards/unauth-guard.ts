import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Auth } from '../../models/auth';
import { getRetryLogged } from '../reducers/login';


@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(private store$: Store<Auth>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store$
      .select('auth')
      .let(getRetryLogged())
      .map((c: Auth) => {
        if (c.isLogged) {
          this.router.navigate(['/activitat']);
        }
        return !c.isLogged;
      }).take(1);
  }
}
