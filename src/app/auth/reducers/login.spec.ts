
import { AuthActions } from '../auth.actions';
import { authReducer } from './login';
import { Auth } from '../../models/auth';


describe('login', () => {
  describe('actions', () => {
  let actions = AuthActions;
  let initialState: Auth;

  beforeEach(() => {
    initialState = {
      isLogged: false,
      isLogging: false,
      hasTryRestore: false
    };
  });

  describe('default', () => {
    it('should return initial state', () => {
      let res = authReducer(initialState, {type: 'UNDEFINED'});
      expect(res.isLogged).toBe(false);
      expect(res.isLogging).toBe(false);
    });
  });

  describe('auth_login', () => {
    it('should return state as isLogging', () => {
      let res = authReducer(initialState, actions.actionLogin());
      expect(res.isLogging).toBe(true);
      expect(res.isLogged).toBe(false);
    });
  });

  describe('aut_loginko', () => {
    it('should return logged false', () => {
      let res = authReducer(initialState, actions.actionLoginKo('err'));
      expect(res.isLogging).toBe(false);
      expect(res.isLogged).toBe(false);
      expect(res.error).toEqual('err');
    });
  });

  });

});
