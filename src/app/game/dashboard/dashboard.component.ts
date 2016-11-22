import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { Dashboard } from '../../models/dashboard';
import { User } from '../../models/user';
import { Message } from '../../models/message';
import { DashboardActions } from '../dashboard.actions';
import { getPublishedJocs } from '../dashboard.reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  public state$: Observable<Dashboard>;
  public user$: Observable<User>;

  constructor(private store: Store<Dashboard>) {

    this.state$ = this.store
      .select('dashboard')
      .let(getPublishedJocs());

    this.user$ = this.store.select('auth').map(a => a['user']);
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

  // launch() {
  //   this.store.dispatch(DashboardActions.setPublicName());
  // }

}
