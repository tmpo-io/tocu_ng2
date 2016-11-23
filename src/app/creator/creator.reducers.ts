
import { Action } from '@ngrx/store';

import { Dashboard } from '../models/dashboard';

import { CreatorActions } from './creator.actions';

export function creatorReducer(state: Dashboard, action: Action): Dashboard {

  switch (action.type) {
    case CreatorActions.UPDATE_JOC:
      let index = state.jocs.findIndex(j => j.id === action.payload.id);
      return Object.assign({}, state, {
        jocs: [
          ...state.jocs.slice(0, index),
          action.payload,
          ...state.jocs.slice(index + 1)
        ]
      });
  }
  return state;
}
