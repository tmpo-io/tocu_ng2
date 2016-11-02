
// import { User } from './user';
import { Auth } from './auth';

import { Dashboard } from './dashboard';

export interface AppState {
  auth: Auth;
  dashboard: Dashboard;
  //
  // auth?: AuthState;
}

