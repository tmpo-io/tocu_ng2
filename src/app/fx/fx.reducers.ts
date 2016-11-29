


import { Action } from '@ngrx/store';

import { FxActions } from './fx.actions';
import { Fx } from '../models/fx';

export const initial: Fx = {
  audios: {},
  loading: [],
  fullLoaded: false,
};


export function fxReducer(state = initial, action: Action) {
  switch (action.type) {
    case FxActions.LOAD:
      if (!(action.payload in state.audios) &&
         (state.loading.indexOf(action.payload) === -1)) {
        return Object.assign({}, state, {
          loading: [...state.loading, action.payload]
        });
      }
    case FxActions.LOAD_COMPLETE:
      let audios = state.audios;
      audios[action.payload.sound] = action.payload.howl;

      let loading = [];
      if (state.loading.length > 1) {
        let pos = state.loading
          .findIndex(a => a === action.payload.sound);
        loading = [
          ...state.loading.slice(0, pos),
          ...state.loading.slice(pos + 1)
        ];
      }

      return Object.assign({}, state, {
        audios,
        loading: loading
      });
    case FxActions.PLAY:
      return Object.assign({}, state, {
        playing: action.payload
      });
  }
  return state;
}
