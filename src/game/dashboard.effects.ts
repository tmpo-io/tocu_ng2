import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';
import { AuthService } from  '../auth/services/auth-service';

import { Dashboard } from '../models/dashboard';
import { DashboardActions } from './dashboard.actions';

import { cleanObject } from '../shared/utils';

import 'rxjs/add/operator/ignoreElements';




@Injectable()
export class DashboardEffects {

  constructor(
    private a$: Actions,
    private af: AngularFire,
    private auth: AuthService,
    private store: Store<Dashboard>) {
  }

  @Effect()
  setup$() {
    return this.a$
    .ofType(DashboardActions.DASH_SETUP)
    .switchMap(a => {
      return this.getSetupStatus()
        .map(v => {
          if (v.$exists()) {
            return DashboardActions.loadData();
          }
          return DashboardActions.needsUpdate();
        });
    });
  }

  @Effect()
  loadData$() {
    return this.a$
      .ofType(DashboardActions.DASH_DATALOAD)
      .switchMap(() =>
        this.getGames().take(1)
        .map(g => DashboardActions.loadDataOk(g))
      );
  }

  @Effect()
  updateDashboard$() {
    return this.a$
      .ofType(DashboardActions.DASH_UPDATE)
      .delay(500)
      .switchMap(() => {
        let user = this.getGames();
        return this.getStarterDb()
          .map(item => this.updateGames(item, user));
      })
      .switchMap((a) => {
        this.getSetupObject().set(true);
        return Observable.of(
          DashboardActions.updateBoardOk(),
          DashboardActions.loadData()
        );
      });
  }


  get db() {
    return this.af.database;
  }

  get uid(): string {
    return this.auth.id;
  }

  updateGames(items, user) {
    return Observable.merge(
      items.map(i =>
        Observable.fromPromise(
          user.push(cleanObject(i))
        )
      )
    );
  }

  getStarterDb() {
    return this
      .db.list('starter');
  }

  getSetupObject() {
    return this
      .db.object(`users/${this.uid}/setup`);
  }

  getSetupStatus() {
    return this
      .getSetupObject()
      .take(1);
  }

  getGames() {
    return this.db
      .list(`users/${this.uid}/jocs/`);
  }

}

