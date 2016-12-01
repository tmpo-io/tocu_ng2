
import { TJoc } from './tjoc';


export const tipusJoc: TJoc[] = [
  {
    desc: 'Un Memory de paraules',
    key: 'memory',
    label: 'Memory',
    validate: joc => joc.words.length === 8,
    validateHelp: joc => `Necessites definir 8 paraules.
      Tens ${joc.words.length} paraules.`
  },
  {
    desc: 'Escriu les lletres de les paraules d\'una en una',
    key: 'lletres',
    label: 'Escriure lletres',
    validate: joc => joc.words.length >= 1,
    validateHelp: joc => `Necessites definir un mínim d'una paraula.
      Tens ${joc.words.length} paraules.`
  },
  {
    desc: 'El joc de les parelles on s\'ha de relacionar imatge i text',
    key: 'relaciona',
    label: 'Relaciona',
    validate: joc => joc.words.length >= 3,
    validateHelp: joc => `Necessites definir un mínim de 3 paraules.
      Tens ${joc.words.length} paraules.`
  },
  {
    desc: 'Tens les lletres de la paraula desordenades i les has d\'ordenar',
    key: 'sequencing',
    label: 'Escriure Paraules',
    validate: joc => joc.words.length >= 3,
    validateHelp: joc => `Necessites definir un mínim de 3 paraules.
      Tens ${joc.words.length} paraules.`
  },
  {
    desc: 'Et proposa 4 paraules, i només una és la bona.',
    key: 'mixed',
    label: 'Paraules barrejades',
    validate: joc => joc.words.length >= 3,
    validateHelp: joc => `Necessites definir un mínim de 3 paraules.
      Tens ${joc.words.length} paraules.`
  }
];
