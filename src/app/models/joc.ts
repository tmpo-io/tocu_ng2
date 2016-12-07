
import { Word } from './word';

export interface Joc {
  label?: string;
  id?: string;
  image?: string;
  file?: string;
  published?: boolean;
  public?: boolean;
  tipus?: string;
  words?: Word[];
  $exists?: any;
  $key?: any;
  level?: string;
}

