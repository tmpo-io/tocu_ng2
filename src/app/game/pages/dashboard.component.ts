import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { Dashboard } from '../../models/dashboard';
import { User } from '../../models/user';
import { Message } from '../../models/message';
import { DashboardActions } from '../dashboard.actions';
import { AuthActions } from '../../auth/auth.actions';


@Component({
  selector: 'app-dashboard',
  template: `
  <app-activitat
    [dashboard]="state$|async"
    [user]="user$|async"
    (dashClick)="clickNext()"
    (deleteMsg)="deleteMessage($event)"
    (logout)="logout($event)"
    (changeUser)="changeUser()">
  <app-activitat>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  public state$: Observable<Dashboard>;
  public user$: Observable<User>;

  constructor(
    private store: Store<Dashboard>,
    private router: Router) {

    this.state$ = store
      .select('dashboard')
      .map((d: Dashboard) => {
        if (d.setupTask !== 'ready'
          && d.setupTask !== 'waiting') {
          store.dispatch(DashboardActions.checkSetup());
        }
        return d;
      });

    this.user$ = this.store
      .select('auth').map(a => a['user']);

  }

  ngOnInit() { }

  changeUser() {
    this.store.dispatch(
      DashboardActions.changeProfile()
    );
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
