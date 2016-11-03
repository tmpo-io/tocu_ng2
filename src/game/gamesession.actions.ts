

import { Action } from '@ngrx/store';

import { GameSession } from '../models/gamesession';


export class GSActions {

  static CHECK_DASHBOARD = '[GS] check dash';
  static CHECK_DASHBOARD_OK = '[GS] check dash ok';
  static CHECK_DASHBOARD_KO = '[GS] check dash KO';

  static LOAD_GAMES = '[GS] Load Games';
  static LOAD_GAMES_OK = '[GS] Load Games';


  static load(id: string): Action {
    return {
      type: GSActions.LOAD_GAMES,
      payload: id
    };
  }

  static check(board: string): Action {
    return {
      type: GSActions.CHECK_DASHBOARD,
      payload: board
    };
  }

  static check_invalid(err = null): Action {
    return {
      type: GSActions.CHECK_DASHBOARD_KO,
      payload: err
    };
  }

  static check_valid(id: string) {
    return {
      type: GSActions.CHECK_DASHBOARD_OK,
      payload: id
    };
  }

}
