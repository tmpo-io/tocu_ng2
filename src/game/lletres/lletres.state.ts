


export interface Point {
  x: number;
  y: number;
  status?: 'current' | 'next' | 'completed';
}


export interface Segment {
  from: Point;
  to: Point;
}

export interface Char {
  punts: Point[];
  lletra: string;
  status: 'pending' | 'playing' |'done';
  started: number;
  totalTime: number;
  nodeTime: number[];
}


export interface LletresGameState {

  letters: Char[];
  currentLetter: number;
  segments: Segment[];
  currentSegment: number;
  nextSegment: number;

}


/*

Flux del joc:
 A. Es mostra la lletra a escriure.
 B. Es carreguen els punts...
  1. S'encen el punt 0 inidicant a l'usuari que l'ha d'arrosegar
  2. Quan l'usuari clica el punt es comença a fer el drag i s'encen el punt 2.
  3. Si l'usuari va al punt seguent. Salta al punt 2. Sino, torna al punt 0
  4. Si salta al punt dos... s'inicia el drag automatic d'aquest... sino, el torna
     al punt anterior... (Pero s'inicia el drag?)
  5. Fins que s'acaba


*/

