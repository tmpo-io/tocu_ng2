import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';
import { AuthService } from  '../auth/services/auth-service';

import { Dashboard } from '../models/dashboard';
import { welcomeMessage } from '../models/message';
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
    const combine = (x, y) => ({j: x, m: y});
    return this.a$
      .ofType(DashboardActions.DASH_DATALOAD)
      .switchMap(() =>
        this.getGames().take(1)
          .combineLatest(this.getMessages().take(1), combine)
          .map(g => DashboardActions.loadDataOk(g.j, g.m))
      );
  }

  @Effect()
  updateDashboard$() {
    return this.a$
      .ofType(DashboardActions.DASH_UPDATE)
      .delay(500)
      .switchMap(() => {
        // let user = this.getGames();
        return this.getStarterDb()
          .map(item => this.updateGames(item));
      })
      .switchMap(() => {
        this.getSetupObject().set(true);
        this.addWelcomeMessage();
        return Observable.of(
          DashboardActions.updateBoardOk(),
          DashboardActions.loadData()
        );
      });
  }

  @Effect({ dispatch: false })
  removeMessage$() {
    return this.a$
      .ofType(DashboardActions.DASH_DEL_MSG)
      .map(action =>
        this.getMessage(action.payload.$key)
        .remove()
      );

  }

  get db() {
    return this.af.database;
  }

  get uid(): string {
    return this.auth.id;
  }

  updateGames(items) {
    return Observable.merge(
      items.map(i =>
        Observable.fromPromise(
          this.getGameObject(i.id)
            .set(cleanObject(i)) as Promise<any>
        )
      )
    );
  }

  addWelcomeMessage() {
    this.db
      .list(`users/${this.uid}/messages/`)
      .push(welcomeMessage());
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

  getGameObject(id: string) {
    return this.db
      .object(`users/${this.uid}/jocs/${id}/`);
  }

  getGames() {
    return this.db
      .list(`users/${this.uid}/jocs/`);
  }

  getMessages() {
    return this.db
      .list(`users/${this.uid}/messages/`);
  }

  getMessage(id: string) {
    return this.db
      .object(`users/${this.uid}/messages/${id}`);
  }

}

