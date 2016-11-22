import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { Dashboard } from '../../models/dashboard';
import { User } from '../../models/user';
import { Message } from '../../models/message';
import { DashboardActions } from '../dashboard.actions';
import { getPublishedJocs } from '../dashboard.reducers';
import { AuthActions } from '../../auth/auth.actions';


@Component({
  selector: 'app-dashboard',
  template: `
  <app-activitat
    [dashboard]="state$|async"
    [user]="user$|async"
    (dashClick)="clickNext()"
    (deleteMsg)="deleteMessage($event)"
    (logout)="logout($event)">
  <app-activitat>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  public state$: Observable<Dashboard>;
  public user$: Observable<User>;

  constructor(
    private store: Store<Dashboard>,
        private router: Router) {

    this.state$ = this.store
      .select('dashboard')
      .let(getPublishedJocs());

    this.user$ = this.store
      .select('auth').map(a => a['user']);
    this.store.dispatch(DashboardActions.checkSetup());

  }

  clickNext() {
    this.store.dispatch(DashboardActions.updateBoard());
  }

  deleteMessage(msg: Message) {
    // console.log("delete message", event);
    this.store.dispatch(
      DashboardActions.deleteMessage(msg)
    );
  }

  logout(res: boolean) {
    // console.log('logout');
    this.store.dispatch(
      AuthActions.logout()
    );
    this.router.navigate(['/']);
  }

  // launch() {
  //   this.store.dispatch(DashboardActions.setPublicName());
  // }

}
