

import { Action } from '@ngrx/store';

import { DashboardActions } from './dashboard.actions';
import { Dashboard } from '../models/dashboard';


export const initial: Dashboard = {
  messages: [],
  jocs: []
};


export function dashboardReducer(state = initial, action: Action): Dashboard {
  switch (action.type) {
    case DashboardActions.DASH_SETUP:
      return Object.assign({}, state, {
        setupTask: 'waiting'
      });
    case DashboardActions.DASH_DATALOAD:
      return Object.assign({}, state, {
        setup: true,
        setupTask: 'ready',
        loadData: 'waiting'
      });
    case DashboardActions.DASH_DATALOAD_OK:
      return Object.assign({}, state, {
        loadData: 'ready',
        jocs: action.payload.jocs
      });
    case DashboardActions.DASH_NEEDSDUPDATE:
      return Object.assign({}, state, {
        setup: false,
        setupTask: 'ready'
      });
    case DashboardActions.DASH_UPDATE:
      return Object.assign({}, state, {
        updateBoardTask: 'waiting'
      });
    case DashboardActions.DASH_UPDATE_OK:
      return Object.assign({}, state, {
        updateBoardTask: 'ready',
        setup: true
      });
  default:
    return state;
  }
}


// Selects
export function getJocs() {
  return $state =>
    $state.map((j: Dashboard) => j.jocs);
}

export function getMessages() {
  return $state =>
    $state.map((das: Dashboard) => das.messages);
}