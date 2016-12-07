
import { Joc } from './joc';


export interface Level {
  titol: string;
  desc: string;
}

export interface TJoc {
  desc: string;
  label: string;
  key: string;
  hasLevels?: boolean;
  levels?: Level[];

  validate?(joc: Joc): boolean;
  validateHelp?( joc: Joc): string;


}


