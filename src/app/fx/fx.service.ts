import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { FxActions } from './fx.actions';

import { AppState } from '../models/app';

@Injectable()
export class FxService {

  constructor(private store: Store<AppState>) {
    // setTimeout(() => {
    // }, 1000);
    // this.loadMultiple([
    //   '/assets/fx/click.mp3',
    //   '/assets/fx/aplauso.mp3',
    //   // '/assets/fx/fiuu.mp3'
    // ]);
    // this.load('/assets/fx/click.mp3');
  }

  load(audio: string) {
    // console.log('audio load', audio);
    this.store.next(
      FxActions.load(audio)
    );
  }

  loadMultiple(audio: string[]) {
    audio.forEach(a => this.load(a));
  }

  play(audio: string) {
    this.store.dispatch(
      FxActions.play(audio)
    );
  }

}
