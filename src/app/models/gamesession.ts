
import { AsyncTask } from './dashboard';
import { Joc } from './joc';


export interface GameSession {

  dashboardExists: AsyncTask;
  publicName?: string;
  error?: any;
  userID?: string;
  loadJocs: AsyncTask;
  jocs: Joc[];




}
