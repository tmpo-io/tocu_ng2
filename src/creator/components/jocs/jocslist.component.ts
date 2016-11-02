import { Component, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  AngularFire,
  FirebaseListObservable
} from 'angularfire2';

import { AuthService } from '../../../auth';
import { Dashboard } from '../../../models/dashboard';
import { AppState } from '../../../models/app';
import { DashboardActions } from '../../../game/dashboard.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-creator-jocs',
  templateUrl: 'jocslist.component.html',
  styleUrls: ['./joclist.component.scss']
})
export class JocsListComponent implements OnDestroy {

  state: Dashboard;
  bucket: string;
  sub: Subscription;

  dash$: Observable<Dashboard>;

  constructor(
    private af: AngularFire,
    private auth: AuthService,
    private store: Store<AppState>) {

      this.bucket = `users/${auth.id}/jocs`;
      // this.activitats = af.database.list(this.bucket);
      this.dash$ = this.store
         .select('dashboard')
         .map((dash) => {
           if (dash['loadData'] === 'notready') {
             this.store.dispatch(DashboardActions.loadData());
           }
           return dash;
         });
      this.sub = this.dash$.subscribe((r) => {
        this.state = r;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
