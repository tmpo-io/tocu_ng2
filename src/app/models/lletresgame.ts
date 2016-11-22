
import { Word } from './word';

export interface LletresGame {

  words: Word[];
  state: 'new_word' | 'new_lletra' | 'lletra_ok' | 'loading';
  currentWord: number;
  currentLetter: number;

}
