

import { Graphics, Point } from 'pixi.js';
import { getColorNum } from '../../shared/colors';


export class Segment extends Graphics {


  constructor(public from: Point, public to: Point) {
    super();
    this.lineStyle(20, getColorNum('gris'));
    this.moveTo(from.x, from.y);
    this.lineTo(to.x, to.y);
  }



}
