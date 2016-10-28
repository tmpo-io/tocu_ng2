

import { Action } from '@ngrx/store';
// import { Dashboard } from '../models/dashboard';
import { Joc } from '../models/joc';
import { Message } from '../models/message';

export class DashboardActions {

  static DASH_SETUP = 'DASH_SETUP';
  static DASH_NEEDSDUPDATE = 'DASH_NEEDSUPDATE';
  static DASH_UPDATE = 'DASH_UPDATE';
  static DASH_UPDATE_OK = 'DASH_UPDATE_OK';
  static DASH_DATALOAD = 'DASH_DATALOAD';
  static DASH_DATALOAD_OK = 'DASH_DATALOAD_OK';
  static DASH_DEL_MSG = 'DASH_DEL_MSG';

  static checkSetup(): Action {
    return {
      type: DashboardActions.DASH_SETUP
    };
  }

  static loadData(): Action {
    return {
      type: DashboardActions.DASH_DATALOAD
    };
  }

  static loadDataOk(jocs: Joc[], messages: Message[]): Action {
    return {
      type: DashboardActions.DASH_DATALOAD_OK,
      payload: {
        jocs,
        messages
      }
    };
  }

  static needsUpdate(): Action {
    return {
      type: DashboardActions.DASH_NEEDSDUPDATE
    };
  }

  static updateBoard(): Action {
    return {
      type: DashboardActions.DASH_UPDATE
    };
  }

  static updateBoardOk(): Action {
    return {
      type: DashboardActions.DASH_UPDATE_OK
    };
  }

  static deleteMessage(msg): Action {
    return {
      type: DashboardActions.DASH_DEL_MSG,
      payload: msg
    };
  }

}
