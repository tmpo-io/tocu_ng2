
// import { User } from './user';
import { Auth } from './auth';

import { Dashboard } from './dashboard';
import { GameSession } from './gamesession';

export interface AppState {
  auth: Auth;
  dashboard: Dashboard;
  gameSession: GameSession;
  //
  // auth?: AuthState;
}

