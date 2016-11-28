

import { Action } from '@ngrx/store';

export class FxActions {

  static LOAD = '[FX] Load';
  static LOAD_COMPLETE = '[FX] Load Complete';
  static PLAY = '[FX] Play Sound';


  static load(sound: string): Action {
    return {
      type: FxActions.LOAD,
      payload: sound
    };
  }

  static loadComplete(sound: string, howl: any): Action {
    return {
      type: FxActions.LOAD_COMPLETE,
      payload: {
        sound,
        howl
      }
    };
  }

  static play(sound: string): Action {
    return {
      type: FxActions.PLAY,
      payload: sound
    };
  }

}




