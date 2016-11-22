import { Component, EventEmitter,
  Input, Output, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';


import { WordsService, SoundFXService } from '../services';
import { LletresGame } from '../../models/lletresgame';

import { LletresGameActions as Actions } from './lletresgame.actions';


@Component({
  selector: 'app-lletres-game',
  templateUrl: 'lletresgame.component.html'
})
export class LletresGameComponent implements OnInit {

  @Input() words;
  @Output() onWin = new EventEmitter<number>();
  @Output() onFail = new EventEmitter<number>();
  @Output() onFinish = new EventEmitter<number>();

  state$: Observable<LletresGame>;

  constructor(
    private srv: WordsService,
    private fx: SoundFXService,
    public store$: Store<AppState>) {
      this.state$ = store$.select(a => a.lletresGame);
    }


  ngOnInit() {
    // Loaded words...
    this.store$.dispatch(Actions.loadWords(this.words));

  }


}

