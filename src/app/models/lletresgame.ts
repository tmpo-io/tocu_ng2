
import { Word } from './word';

import { LLetraSerial } from '../game/lletres/lletres.state';

export interface LletresGame {

  words: Word[];
  status: 'show_word' | 'win_word' | 'hide_winword'
    | 'lletra_play' | 'lletra_win'
    | 'next_lletra' | 'initial';
  currentWord: number;
  currentLetter: number;
  char?: LLetraSerial;
  word: string;
}

