import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

import { GSActions } from './gamesession.actions';

@Injectable()
export class GSEffects {

  constructor(private action$: Actions, private af: AngularFire) {}

  // @Effect()
  // checkBoard$ = this.action$
  //   .ofType(GSActions.CHECK_DASHBOARD)
  //   .switchMap(ac => {
  //     // console.log('action', ac);
  //     return this.af.database
  //       .object(`names/${ac.payload}`)
  //       .take(1)
  //       .map(v => {
  //         if (!v.$exists()) {
  //           return GSActions.check_invalid();
  //         }
  //         return GSActions.check_valid(v.$value);
  //       });
  //   });


}
