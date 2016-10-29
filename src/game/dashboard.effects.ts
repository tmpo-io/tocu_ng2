import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';
import { AuthService } from  '../auth/services/auth-service';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/observable/defer';

import { Dashboard } from '../models/dashboard';
import { welcomeMessage } from '../models/message';
import { DashboardActions } from './dashboard.actions';
import { cleanObject } from '../shared/utils';
import { checkSetupStatus } from './effects/setupstatus';
import { getPublicName } from './effects/publicname';
import { loadData } from './effects/loaddata';


@Injectable()
export class DashboardEffects {

  constructor(
    private a$: Actions,
    private af: AngularFire,
    private auth: AuthService,
    private store: Store<Dashboard>) {
  }

  @Effect()
  loadData$ = this.a$
    .ofType(DashboardActions.DASH_DATALOAD)
    .let(loadData(this.auth, this.db));

  @Effect()
  setup$ = this.a$
    .ofType(DashboardActions.DASH_SETUP)
    .let(checkSetupStatus(this.auth, this.db));

  @Effect()
  publicName$ = this.a$
    .ofType(DashboardActions.DASH_PUBLICNAME)
    .let(getPublicName(this.auth, this.db));


  @Effect()
  updateDashboard$() {
    return this.a$
      .ofType(DashboardActions.DASH_UPDATE)
      .delay(500)
      .switchMap(() => {
        return this.getStarterDb()
          .map(item => this.updateGames(item));
      })
      .switchMap(() => {
        this.getSetupObject().set(true);
        this.addWelcomeMessage();
        return Observable.of(
          DashboardActions.setPublicName(),
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

  keyExists(key: string): Observable<boolean> {
    return this.db.object(key)
      .switchMap(j => Observable.of(j.$exists()));
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

  generatePublicName(name:string) {
    return this.db.object('keys/${}')
  }

  getPublicBoard() {
    return this
      .db.object(`users/${this.uid}/public`);
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

