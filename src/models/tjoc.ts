
import { Joc } from './joc';

export interface TJoc {
  desc: string;
  label: string;
  key: string;
  hasLevels?: boolean;

  validate?(joc: Joc): boolean;
  validateHelp?( joc: Joc): string;

}


