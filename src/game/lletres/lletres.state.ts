


export interface Point {
  x: number;
  y: number;
  status?: 'current' | 'next' | 'completed';
}

export type Part = Point[];
export type Lletra = Part[];

export type LLetraSerial = number[][];


