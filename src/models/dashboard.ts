

import { Joc } from './joc';

import { Message } from './message';

export type AsyncTask =
  'waiting' |
  'ready'   |
  'failed';

export interface Dashboard {
  messages?: Message[];
  jocs?: Joc[];
  // IS FIRST TIME PLAYER
  setup?: boolean;
  setupTask?: AsyncTask;

  // Public board ID
  publicBoard?: string;
  publicBoardTask?: AsyncTask;

  // TASK UPDATING BOARD
  updateBoard?: boolean;
  updateBoardTask?: AsyncTask;

  loadData?: AsyncTask;

}

