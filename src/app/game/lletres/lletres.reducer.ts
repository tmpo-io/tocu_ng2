
import { LletresGame } from '../../models/lletresgame';
import { Action } from '@ngrx/store';
import { LletresActions } from './lletres.actions';
import { CHARS } from './chars';
import { Shuffle } from '../helpers';


export const initial: LletresGame = {
  words: [],
  word: '',
  status: 'initial',
  currentWord: 0,
  currentLetter: 0,
  char: null,
  character: ''
};



export function lletresGameReducer(state = initial, action: Action) {
  switch (action.type) {
    case LletresActions.SHOW_WORD:
      let cWord = state.currentWord;
      if (state.status !== 'initial') {
        cWord = state.currentWord + 1;
      }
      return Object.assign({}, state, {
        status: 'show_word',
        currentWord: cWord,
        word: state.words[cWord].label.toUpperCase()
      });
    case LletresActions.ADD_WORDS:
      let words = Shuffle([...action.payload]);
      // Initialize game
      state = Object.assign({}, initial);
      return Object.assign({}, state, {
        words: words,
      });
    case LletresActions.PLAY_LETTER:
      let current = 0;
      if (state.status === 'lletra_win') {
        current = state.currentLetter + 1;
      }
      // @todo si lletra espai, seguent...
      let letter = normalizeLletra(
          state.word[current].toUpperCase()
      );
      // console.log(letter);
      return Object.assign({}, state, {
        status: 'lletra_play',
        char: CHARS[letter],
        character: letter,
        currentLetter: current
      });
    case LletresActions.WIN_LETTER:
      return Object.assign({}, state, {
        status: 'lletra_win'
      });
    case LletresActions.WIN_WORD:
      return Object.assign({}, state, {
        status: 'win_word'
      });
    case LletresActions.HIDEWIN_WORD:
      return Object.assign({}, state, {
        status: 'hide_winword'
      });
    case LletresActions.END_GAME:
      return Object.assign({}, state, {
        status: 'end_game'
      });
  }
  return state;
};


export function normalizeLletra(l: string) {
  if (l === 'À') {
    return 'A';
  }
  if (l === 'È' || l === 'É') {
    return 'E';
  }
  if (l === 'Í') {
    return 'I';
  }
  if (l === 'Ò' || l === 'Ó') {
    return 'O';
  }
  if (l === 'Ú') {
    return 'U';
  }
  return l;
}
