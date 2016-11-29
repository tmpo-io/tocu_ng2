
import { Injectable } from '@angular/core';

import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


import { AppState } from '../../models/app';
import { SoundFXService } from '../services/soundfx.service';
import { FxService } from '../../fx/fx.service';

import { Actions, Effect } from '@ngrx/effects';
import { LletresActions } from './lletres.actions';


@Injectable()
export class LletresEffects {

  constructor(private actions: Actions,
    private store: Store<AppState>,
    private fx: SoundFXService,
    private gfx: FxService) { }

  @Effect()
  selectWord: Observable<Action> = this.actions
    .ofType(LletresActions.ADD_WORDS)
    .map(act => LletresActions.showWord());


  @Effect()
  winLetter: Observable<Action> = this.actions
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
  hideWinWord: Observable<Action> = this.actions
    .ofType(LletresActions.HIDEWIN_WORD)
    .delay(1000)
    .map(act => {
      if (act.payload === true) {
        return LletresActions.endGame();
      }
      return LletresActions.showWord();
    });


  @Effect({ dispatch: false })
  fxShowWord$ = this.actions
    .ofType(LletresActions.SHOW_WORD, LletresActions.WIN_WORD)
    .delay(500)
    .flatMap(act => {
      return this.store
        .select(store => store.lletresGame)
        .map(llg => {
          let sound = llg.words[llg.currentWord].audio;
          this.fx.play(sound);
        }).take(1);
    });

  @Effect({ dispatch: false })
  fxClaps$ = this.actions
    .ofType(LletresActions.WIN_WORD)
    .delay(500)
    .map(act => this.gfx.play('/assets/fx/aplauso.mp3'));

}
