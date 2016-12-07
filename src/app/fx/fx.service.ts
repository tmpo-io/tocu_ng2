import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { FxActions } from './fx.actions';

import { AppState } from '../models/app';

@Injectable()
export class FxService {

  constructor(private store: Store<AppState>) {}

  load(audio: string) {
    this.store.next(
      FxActions.load(this.getName(audio))
    );
  }

  loadMultiple(audio: string[]) {
    audio.forEach(a => this.load(a));
  }

  play(audio: string) {
    this.store.dispatch(
      FxActions.play(this.getName(audio))
    );
  }

  getName(s: string) {
    if (!s.endsWith('.mp3')) {
      return `/assets/fx/${s}.mp3`;
    }
    return s;
  }

}
