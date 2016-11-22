
// import { User } from './user';
import { Auth } from './auth';

import { Dashboard } from './dashboard';
import { GameSession } from './gamesession';
import { LletresGame } from './lletresgame';

export interface AppState {
  auth: Auth;
  dashboard: Dashboard;
  gameSession: GameSession;
  lletresGame: LletresGame;
  //
  // auth?: AuthState;
}

