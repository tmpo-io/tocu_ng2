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
// import { cleanObject } from '../shared/utils';
import { checkSetupStatus } from './effects/setupstatus';
import { getPublicName } from './effects/publicname';
import { loadData } from './effects/loaddata';
import { copyGamesFromStarter } from './effects/updatedashboard';
import { removeMessage } from './effects/messages';


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
      .let(copyGamesFromStarter(this.auth, this.db))
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
  removeMessage$ = this.a$
    .ofType(DashboardActions.DASH_DEL_MSG)
    .let(removeMessage(this.auth, this.db));


  get db() {
    return this.af.database;
  }

  get uid(): string {
    return this.auth.id;
  }

  addWelcomeMessage() {
    this.db
      .list(`users/${this.uid}/messages/`)
      .push(welcomeMessage());
  }

  getSetupObject() {
    return this
      .db.object(`users/${this.uid}/setup`);
  }



}

