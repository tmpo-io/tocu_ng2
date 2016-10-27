

import { Joc } from './joc';


export type AsyncTask =
  'waiting' |
  'ready'   |
  'failed';

export interface Dashboard {
  messages?: any;
  jocs?: Joc[];
  // IS FIRST TIME PLAYER
  setup?: boolean;
  setupTask?: AsyncTask;

  // TASK UPDATING BOARD
  updateBoard?: boolean;
  updateBoardTask?: AsyncTask;

  loadData?: AsyncTask;

}

