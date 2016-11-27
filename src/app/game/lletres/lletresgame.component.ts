import {
  Component, EventEmitter, ChangeDetectionStrategy,
  Input, Output, OnInit
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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
export class LletresGameComponent implements OnInit {

  @Input() words: Word[];
  @Output() onWin = new EventEmitter<number>();
  @Output() onFail = new EventEmitter<number>();
  @Output() onFinish = new EventEmitter<number>();

  state$: Observable<LletresGame>;
  state: LletresGame;
  subs: Subscription;

  constructor(
    private srv: WordsService,
    private fx: SoundFXService,
    public store$: Store<AppState>) {
    this.subs = store$
      .select(state => state.lletresGame)
      .subscribe(st => this.state = st);
  }


  ngOnInit() {

    this.store$.next(LletresActions.addWords(this.words));
    // Loaded words...
    // this.store$.next(LletresActions.showWord());
  }

  action(act: string) {
    if (act === 'playLetter') {
      this.store$.dispatch(LletresActions.playLetter());
    }
    if (act === 'lletraWin') {
      this.store$.dispatch(
        LletresActions.winLetter(this.state.word, this.state.currentLetter)
      );
    }
  }

  get word(): Word {
    return this.state.words[this.state.currentWord];
  }

  get wordprogress(): boolean {
    return this.state.status === 'lletra_play' ||
      this.state.status === 'lletra_win';
  }

}

