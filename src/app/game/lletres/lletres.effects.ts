
import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { LletresActions } from './lletres.actions';


@Injectable()
export class LletresEffects {

  constructor(private actions: Actions) { }

  @Effect()
  selectWord = this.actions
    .ofType(LletresActions.ADD_WORDS)
    .map(act => LletresActions.showWord());


  @Effect()
  winLetter = this.actions
    .ofType(LletresActions.WIN_LETTER)
    .delay(500)
    .map(act => {
      if (act.payload.word.length > (act.payload.current + 1)) {
        return LletresActions.playLetter();
      } else {
        return LletresActions.winWord();
      }
    });


  @Effect()
  hideWinWord = this.actions
    .ofType(LletresActions.HIDEWIN_WORD)
    .delay(1000)
    .map(act => LletresActions.showWord());


}
