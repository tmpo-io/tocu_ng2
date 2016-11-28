
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FxActions } from './fx.actions';

import { AppState } from '../models/app';

declare var Howl: any;

@Injectable()
export class FxEffects {

  constructor(
    private actions: Actions,
    private store: Store<AppState>) {

  }

  @Effect({ dispatch: false })
  loadAudio$ = this.actions
    .ofType(FxActions.LOAD)
    .switchMap((a) => {
      let s = a.payload;
      return this.store
        .select(store => store.fx)
        .switchMap((fx) => {
          // console.log('fx', fx, a.payload);
          if (a.payload in fx.audios) {
            return Observable.of(null);
          }
          return this.loadAudio(s)
            .take(1)
            .map((aud) => {
              this.store.dispatch(
                FxActions.loadComplete(a.payload, aud)
              );
              return Observable.of(null);
            });
        });
    });

  @Effect({ dispatch: false })
  play$ = this.actions
    .ofType(FxActions.PLAY)
    .flatMap((act) => {
      console.log('effect', act);
      return this.store
        .select(store => store.fx)
        .take(1)
        .map((fx) => {
          console.log('effect 2', fx);
          // if (fx.audios[act.payload]) {
          fx.audios[act.payload].play();
          // }
        });
    });


  loadAudio(file: string): Observable<any> {
    return new Observable<any>((observed) => {
      let audio = new Howl({
        src: [file],
        format: 'mp3',
        onload: () => {
          observed.next(audio);
          observed.complete();
        }
      });
      return () => {
        audio.unload();
      };
    });
  }




}
