import { Injectable } from '@angular/core';
import { CanActivate,
  ActivatedRouteSnapshot,
  Router } from '@angular/router';

import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Store } from '@ngrx/store';

import { GameSession } from '../../models/gamesession';
import { GSActions } from '../gamesession.actions';
import { getGameSession } from '../gamesession.reducers';



@Injectable()
export class BoardExistsGuard implements CanActivate {

  constructor(
    private store: Store<GameSession>,
    private af: AngularFire,
    private router: Router) {

  }

  dashboardInStore(id: string): Observable<boolean> {
    return this.store
      .let(getGameSession())
      .take(1)
      .map((v: GameSession) => {
        if (v.publicName === id) {
          return true;
        }
        return false;
      });
  }

  dashboardInRemote(id: string): Observable<boolean> {
    this.store.dispatch(GSActions.check(id));
    return this.af.database
      .object(`names/${id}`)
      .map(v => {
        if (!v.$exists()) {
          this.store.dispatch(GSActions.check_invalid());
          this.router.navigate(['/']);
          return false;
        }
        this.store.dispatch(GSActions.check_valid(v.$value));
        return true;
      })
      .catch((err) => {
        console.log('err', err);
        this.store.dispatch(GSActions.check_invalid(err));
        return of(false);
      });
  }


  dashboardExists(id: string): Observable<boolean> {
    return this.dashboardInStore(id)
      .switchMap(exist => {
        if (exist) {
          return of(true);
        }
        return this.dashboardInRemote(id);
      });
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.dashboardExists(route.params['user'])
      .take(1);
  }
}
