import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { Dashboard } from '../../models/dashboard';
import { User } from '../../models/user';
import { DashboardActions } from '../dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  public state$: Observable<Dashboard>;
  public user$: Observable<User>;

  constructor(private store: Store<Dashboard>) {

    this.state$ = this.store.select('dashboard');
    this.user$ = this.store.select('auth').map(a => a['user']);
    this.store.dispatch(DashboardActions.checkSetup());

  }

  clickNext() {
    this.store.dispatch(DashboardActions.updateBoard());
  }

}
