import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';


import { AuthService } from  '../auth/services/auth-service';

import { Dashboard } from '../models/dashboard';
import { DashboardActions } from './dashboard.actions';

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
        this.getGames()
        .map(g => DashboardActions.loadDataOk(g))
      );
  }

  @Effect()
  updateDashboard$() {
    return this.a$
      .ofType(DashboardActions.DASH_UPDATE)
      .delay(2000)
      .switchMap(() => {
        this.getSetupObject().set(true);
        //@TODO Copy available games...
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
      .list(`users/${this.uid}/jocs/`).take(1);
  }

}

