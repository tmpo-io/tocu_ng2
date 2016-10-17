
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
      En tens ${joc.words.length}.`
  },
  {
    desc: "El joc de les parelles on s'ha de relacionar imatge i texte",
    key: "relaciona",
    label: "Relaciona"
  },
  {
    desc: "Tens les lletres de la paraula desordenades i les has d'ordenar",
    key: "sequencing",
    label: "Escriure Paraules"
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
