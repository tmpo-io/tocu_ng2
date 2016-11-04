import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

import { GSActions } from './gamesession.actions';

@Injectable()
export class GSEffects {



  constructor(private action$: Actions, private af: AngularFire) {}

  @Effect()
  loadGames$ = this.action$
    .ofType(GSActions.LOAD_GAMES)
    .switchMap(ac => {
      return this.af.database
          .list(`users/${ac.payload}/jocs/`).take(1)
          .map(v => {
            return GSActions.loadOk(v);
          }).catch(
            (err) => Observable.of(GSActions.loadKo(err))
          );
    });


}

// GSEffects.metadata = {};
// GSEffects.metadata['@ngrx/effects'] = [
//   {propertyName: 'loadGames$', dispatch: true}
// ]

