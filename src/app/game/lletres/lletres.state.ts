


export interface IPoint {
  x: number;
  y: number;
  status?: 'current' | 'next' | 'completed';
}

export type Part = IPoint[];
export type Lletra = Part[];

export type LLetraSerial = number[][];


