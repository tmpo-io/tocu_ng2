

import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { CreatorActions } from './creator.actions';

import { JocDb } from './services/jocdb.service';

@Injectable()
export class CreatorEffects {

  constructor(
    private actions: Actions,
    private db: JocDb) { }

  @Effect({ dispatch: false })
  deleteGame$ = this.actions
    .ofType(CreatorActions.DELETE_JOC)
    .flatMap((a) => {
      return this.db.remove(a.payload).take(1);
    });


}
