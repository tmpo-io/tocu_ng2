

import { LletresActions } from './lletres.actions';
import { lletresGameReducer, initial } from './lletres.reducer';


describe('lletres.game.reducer', () => {

  describe('play.lletres', () => {
    let s = Object.assign({}, initial, {
      word: 'ABÓ  s'
    });
    let res = lletresGameReducer(s, LletresActions.playLetter());

    it('should set first letter', () => {
      expect(res.character).toBe('A');
    });

    it('should advance depending on the state', () => {
      s.status = 'lletra_win';
      res = lletresGameReducer(s, LletresActions.playLetter());
      expect(res.character).toBe('B');
      expect(res.currentLetter).toBe(1);
      expect(res.status).toBe('lletra_play');
    });

    it('should replace accent chars', () => {
      s.status = 'lletra_win';
      s.currentLetter = 1;
      res = lletresGameReducer(s, LletresActions.playLetter());
      expect(res.character).toBe('O');
      expect(res.currentLetter).toBe(2);
    });

    it('should replace accent chars and ommit white chars', () => {
      s.status = 'lletra_win';
      s.currentLetter = 2;
      res = lletresGameReducer(s, LletresActions.playLetter());
      expect(res.character).toBe('S');
      expect(res.currentLetter).toBe(5);
    });

  });

});
