
import { Word } from '../../../models';


export interface Joc {
  label?: string
  id?: string
  image?: string
  file?: string
  published?: boolean
  public?: boolean
  tipus?:string
  words?:Word[]
  $exists?:any
  $key?:any
}


export class JocModel {
  label?: string
  id?: string
  image?: string
  file?: string
  status?: boolean
  tipus?:string
  words?:Word[]
}



export interface TJoc {
  desc:string
  label:string
  key:string

  validate?(Joc):boolean
  validateHelp?(Joc):string

  hasLevels?:boolean
}

export interface jocValidation {
  status:boolean
  msg:string
}


export const tipusJoc:TJoc[] = [
  {
    desc: "Un Memory de paraules",
    key: "memory",
    label: "Memory",
    validate: joc => joc.words.length==8,
    validateHelp: joc => `Necessites definir 8 paraules.
      Tens ${joc.words.length} paraules.`
  },
  {
    desc: "El joc de les parelles on s'ha de relacionar imatge i texte",
    key: "relaciona",
    label: "Relaciona",
    validate: joc => joc.words.length>=3,
    validateHelp: joc => `Necessites definir un mínim de 3 paraules.
      Tens ${joc.words.length} paraules.`
  },
  {
    desc: "Tens les lletres de la paraula desordenades i les has d'ordenar",
    key: "sequencing",
    label: "Escriure Paraules",
    validate: joc => joc.words.length>=3,
    validateHelp: joc => `Necessites definir un mínim de 3 paraules.
      Tens ${joc.words.length} paraules.`
  },
  {
    desc: "Et proposa 4 paraules, i només una és la bona.",
    key: "mixed",
    label: "Paraules barrejades",
    validate: joc => joc.words.length>=3,
    validateHelp: joc => `Necessites definir un mínim de 3 paraules.
      Tens ${joc.words.length} paraules.`
  }
]




export function validateJoc(j:Joc):jocValidation {

  let tjoc:TJoc = tipusJoc.find(el => el.key === j.tipus);
  if(!tjoc) {
    throw "Tipus de joc no definit";
  }
  let valid = true;
  let msg = "";
  if(tjoc.validate) {
    valid = tjoc.validate(j)
    if(!valid) {
      msg = tjoc.validateHelp(j);
    }
  }

  return {
    status: valid,
    msg: msg
  }

}


export function audioForWord(w:Word, l:Word[]):string {
  const words = l.filter(p=>p.id==w.id)
  return words[0].audio;
}
