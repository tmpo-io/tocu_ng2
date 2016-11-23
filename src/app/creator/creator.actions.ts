

import { Action } from '@ngrx/store';
import { Joc } from '../models/joc';


export class CreatorActions {

  static UPDATE_JOC = '[CR] update joc';

  static updateJoc(joc: Joc): Action {
    return {
      type: CreatorActions.UPDATE_JOC,
      payload: joc
    };
  }

}
