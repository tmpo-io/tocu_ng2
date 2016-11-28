

import { Action } from "@ngrx/store";

import { Word } from '../../models/word';

export class LletresActions {

  static ADD_WORDS = '[LLG] Add words';
  static SHOW_WORD = '[LLG] Show word';
  static WIN_WORD = '[LLG] Win word';
  static HIDEWIN_WORD = '[LLG] Hide Win word';
  static PLAY_LETTER = '[LLG] Play letter';
  static NEXT_LETTER = '[LLG] Next letter';
  static WIN_LETTER = '[LLG] Lletra complete';
  static END_GAME = '[LLG] End Game';


  static addWords(words: Word[]): Action {
    return {
      type: LletresActions.ADD_WORDS,
      payload: words
    };
  }

  static showWord(): Action {
    return {
      type: LletresActions.SHOW_WORD
    };
  }

  static playLetter(): Action {
    return {
      type: LletresActions.PLAY_LETTER
    };
  }

  static nextLetter(): Action {
    return {
      type: LletresActions.NEXT_LETTER
    };
  }

  static winLetter(word: string, letter: number): Action {
    return {
      type: LletresActions.WIN_LETTER,
      payload: {
        word: word,
        current: letter
      }
    };
  }

  static winWord(): Action {
    return {
      type: LletresActions.WIN_WORD
    };
  }

  static hideWinWord(last = false): Action {
    return {
      type: LletresActions.HIDEWIN_WORD,
      payload: last
    };
  }

  static endGame(): Action {
    return {
      type: LletresActions.END_GAME
    };
  }

}

/*

 -- Screen Word


 */
