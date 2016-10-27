import { Component } from '@angular/core';
import { Store } from '@ngrx/store';


import { Observable } from 'rxjs';
import { Joc } from '../../models/joc';
import { Dashboard } from '../../models/dashboard';

import { DashboardActions } from '../dashboard.actions';
import { getJocs, getMessages } from '../dashboard.reducers';
import { AuthService } from '../../auth/services/auth-service';


@Component({
  selector: 'app-activitat',
  templateUrl: './activitat.component.html',
  styleUrls: ['./activitat.component.scss'],
})

export class ActivitatComponent {

  public data$: Observable<Joc[]>;
  public messages$: Observable<any[]>;
  public user$: Observable<any>;

  constructor(
    private store: Store<Dashboard>,
    public auth: AuthService) {

    // this.data$ = ws.loadGames(auth.id);
      // List of available games
      this.data$ = this.store
        .select('dashboard')
        .let(getJocs()) as Observable<Joc[]>;

      this.messages$ = this.store
        .select('dashboard')
        .let(getMessages()) as Observable<any[]>;

      this.user$ = this.store
        .select('auth')
        .map(a => a['user']);


      this.store.dispatch(DashboardActions.checkSetup());
  }


  start() {
    this.store.dispatch(DashboardActions.updateBoard());
  }



}
