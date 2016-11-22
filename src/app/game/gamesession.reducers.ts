import { Action } from '@ngrx/store';

import { GameSession } from '../models/gamesession';
import { GSActions } from './gamesession.actions';

export const initial: GameSession = {
  dashboardExists: 'notready',
  loadJocs: 'notready',
  publicName: '',
  jocs: []
};

const assign = (state: any, obj: any) =>
  Object.assign({}, state, obj);

export function gsReducer(state = initial, action: Action): GameSession {
    switch (action.type) {
      case GSActions.CHECK_DASHBOARD:
        return assign(state, {
          dashboardExists: 'waiting',
          publicName: action.payload
        });
      case GSActions.CHECK_DASHBOARD_OK:
        return assign(state, {
          dashboardExists: 'ready',
          userID: action.payload
        });
      case GSActions.CHECK_DASHBOARD_KO:
        return assign(state, {
          dashboardExists: 'failed',
          error: action.payload
        });
      case GSActions.LOAD_GAMES:
        return assign(state, {
          loadJocs: 'waiting'
        });
      case GSActions.LOAD_GAMES_OK:
        return assign(state, {
          loadJocs: 'ready',
          jocs: action.payload
        });
      case GSActions.LOAD_GAMES_KO:
        return assign(state, {
          loadJocs: 'failed',
          error: action.payload
        });
    }
    return state;
}


export function checkReady() {
  return state$ => state$
    .filter(gs =>
      gs.dashboardExists !== 'waiting' &&
      gs.dashboardExists !== 'notready');
}

export function getGameSession() {
  return state$ => state$
    .select(state => state['gameSession']);
}
