

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';



import { Actions, Effect } from '@ngrx/effects';
import { CreatorActions } from './creator.actions';
import { JocDb } from './services/jocdb.service';



@Injectable()
export class CreatorEffects {

  constructor(
    private actions: Actions,
    private db: JocDb) { }

  @Effect({ dispatch: false })
  deleteGame$: Observable<boolean> = this.actions
    .ofType(CreatorActions.DELETE_JOC)
    .flatMap((a) => {
      return this.db.remove(a.payload).take(1);
    });

  // @Effect({dispatch: false})
  // updateGame$ = this.actions
  //   .ofType(CreatorActions.UPDATE_JOC)
  //   .flatMap()


}
