import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AuthService } from '../services/auth-service';
import { AuthActions } from '../auth.actions';




@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<any>,
    private auth: AuthService,
    private router: Router) {}

  canActivate2(): Observable<boolean> {
    return this.auth.auth$
      .take(1)
      .map(authState => !!authState)
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/']);
        }
      });
  }

  canActivate(): Observable<boolean> {
    return this.store
      .select('auth')
  }

}
