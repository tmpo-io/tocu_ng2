
import { User } from './user';


export interface Auth {
  hasTryRestore: boolean;
  isLogging: boolean;
  isLogged: boolean;
  user?: User;
  error?: any;
}



