
import { Word } from '../../../models';


export interface Joc {
  label?: string
  id?: string
  image?: string
  file?: string
  status?: boolean
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
}


export const tipusJoc:TJoc[] = [
  {
    desc: "Un Memory de paraules",
    key: "memory",
    label: "Memory"
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

