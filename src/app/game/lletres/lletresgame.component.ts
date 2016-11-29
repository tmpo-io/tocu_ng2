import {
  Component, EventEmitter,
  Input, Output, OnInit, OnDestroy,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { FxService } from '../../fx/fx.service';

import { WordsService, SoundFXService } from '../services';

import { LletresGame } from '../../models/lletresgame';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/app';
import { Word } from '../../models/word';

import { LletresActions } from './lletres.actions';


@Component({
  selector: 'app-lletres-game',
  templateUrl: 'lletresgame.component.html',
  styleUrls: ['./lletresgame.component.scss']
})
export class LletresGameComponent implements OnInit, OnDestroy {

  @Input() words: Word[];
  @Output() onWin = new EventEmitter<number>();
  @Output() onFail = new EventEmitter<number>();
  @Output() onFinish = new EventEmitter<number>();

  state$: Observable<LletresGame>;
  state: LletresGame;
  subs: Subscription;
  played: number = 0;

  constructor(
    private gfx: FxService,
    private srv: WordsService,
    private fx: SoundFXService,
    public store$: Store<AppState>) {
    this.subs = store$
      .select(state => state.lletresGame)
      .subscribe((st) => {
        this.state = st;
        if (st.status === 'end_game') {
          this.onFinish.next(0);
        }
    });

  }


  ngOnInit() {
    this.store$.next(LletresActions.addWords(this.words));
    this.gfx.loadMultiple([
      '/assets/fx/click.mp3',
      '/assets/fx/aplauso.mp3',
      '/assets/fx/fiuu.mp3'
    ]);
    // this.gfx.load('/assets/fx/click.mp3');
  }

  action(act: string) {
    if (act === 'playLetter') {
      this.store$.dispatch(LletresActions.playLetter());
      // this.gfx.play('/assets/snd/cocodril.mp3');
    }
    if (act === 'lletraWin') {
      setTimeout(() => this.gfx.play('/assets/fx/fiuu.mp3'), 500);
      setTimeout(() => {
      this.store$.dispatch(
          LletresActions.winLetter(this.state.word, this.state.currentLetter)
        );
      }, 1500);
    }
    if (act === 'winWord') {
      this.played++;
      this.onWin.next(this.played);
      let end = false;
      if (this.played === this.state.words.length) {
        end = true;
      }
      this.store$.dispatch(
        LletresActions.hideWinWord(end)
      );
    }
    if (act === 'onPoint') {
      this.gfx.play('/assets/fx/click.mp3');
    }
  }

  get word(): Word {
    return this.state.words[this.state.currentWord];
  }

  get wordprogress(): boolean {
    return this.state.status === 'lletra_play' ||
      this.state.status === 'lletra_win';
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}

