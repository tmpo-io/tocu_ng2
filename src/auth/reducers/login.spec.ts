
import { AuthActions } from '../auth.actions';
import { State, authReducer } from './login';


describe('login', () => {
  describe('actions', () => {
  let actions = AuthActions;
  let initialState: State;

  beforeEach(() => {
    initialState = {
      isLogged: false,
      isLogging: false
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
      let res = authReducer(initialState, actions.actionLoginKo());
      expect(res.isLogging).toBe(false);
      expect(res.isLogged).toBe(false);
    });
  });

  });

});
