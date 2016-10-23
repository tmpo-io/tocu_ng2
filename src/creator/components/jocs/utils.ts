
import { Word } from '../../../models/word';
import { Joc } from '../../../models/joc';
import { TJoc } from '../../../models/tjoc';
import { JocValidation } from '../../../models/jocvalidation';
import { tipusJoc } from '../../../models/tipusjoc';


export function validateJoc(j: Joc): JocValidation {

  let tjoc: TJoc = tipusJoc.find(el => el.key === j.tipus);
  if (!tjoc) {
    throw 'Tipus de joc no definit';
  }
  let valid = true;
  let msg = '';
  if (tjoc.validate) {
    valid = tjoc.validate(j);
    if (!valid) {
      msg = tjoc.validateHelp(j);
    }
  }
  return {
    status: valid,
    msg: msg
  };

}


export function audioForWord(w: Word, l: Word[]): string {
  const words = l.filter(p => p.id === w.id);
  return words[0].audio;
}
