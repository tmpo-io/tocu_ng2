

import { Action } from '@ngrx/store';
import { Joc } from '../models/joc';


export class CreatorActions {

  static UPDATE_JOC = '[CR] update joc';
  static DELETE_JOC = '[CR] delete joc';

  static updateJoc(joc: Joc): Action {
    return {
      type: CreatorActions.UPDATE_JOC,
      payload: joc
    };
  }

  static deleteJoc(joc: Joc): Action {
    return {
      type: CreatorActions.DELETE_JOC,
      payload: joc
    };
  }

}
